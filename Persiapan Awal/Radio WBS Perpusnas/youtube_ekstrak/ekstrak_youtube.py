import csv
import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis." + "co" + "m/auth/youtube.readonly"]
CLIENT_SECRET_FILE = "client_secret.json"
TOKEN_FILE = "token.json"

def get_authenticated_service():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())
            
    return build("youtube", "v3", credentials=creds)

def get_uploads_playlist_id(youtube):
    request = youtube.channels().list(
        part="contentDetails,snippet",
        mine=True
    )
    response = request.execute()
    items = response.get("items", [])
    if not items:
        raise ValueError("Channel YouTube tidak ditemukan pada akun Google ini.")
    channel = items[0]
    print(f"Berhasil terhubung ke channel: {channel['snippet']['title']}")
    return channel["contentDetails"]["relatedPlaylists"]["uploads"]

def get_all_video_ids(youtube, playlist_id):
    video_ids = []
    next_page_token = None
    
    while True:
        request = youtube.playlistItems().list(
            part="contentDetails",
            playlistId=playlist_id,
            maxResults=50,
            pageToken=next_page_token
        )
        response = request.execute()
        
        for item in response.get("items", []):
            video_ids.append(item["contentDetails"]["videoId"])
            
        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break
            
    return video_ids

def get_videos_metadata(youtube, video_ids):
    all_metadata = []
    
    for i in range(0, len(video_ids), 50):
        batch_ids = ",".join(video_ids[i:i+50])
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics,status,liveStreamingDetails",
            id=batch_ids
        )
        response = request.execute()
        
        for item in response.get("items", []):
            snippet = item.get("snippet", {})
            stats = item.get("statistics", {})
            status = item.get("status", {})
            content = item.get("contentDetails", {})
            live_details = item.get("liveStreamingDetails")
            
            is_live_content = live_details is not None
            
            data = {
                "video_id": item["id"],
                "url_video": "https://www.youtube." + "co" + "m/watch?v=" + item["id"],
                "tipe_konten": "Live Stream" if is_live_content else "Video Upload",
                "judul": snippet.get("title", ""),
                "deskripsi": snippet.get("description", ""),
                "tanggal_publish": snippet.get("publishedAt", ""),
                "tags": ", ".join(snippet.get("tags", [])),
                "kategori_id": snippet.get("categoryId", ""),
                "status_privasi": status.get("privacyStatus", ""),
                "durasi_iso": content.get("duration", ""),
                "views": stats.get("viewCount", 0),
                "likes": stats.get("likeCount", 0),
                "komentar": stats.get("commentCount", 0),
                "live_jadwal_mulai": live_details.get("scheduledStartTime", "") if is_live_content else "",
                "live_aktual_mulai": live_details.get("actualStartTime", "") if is_live_content else "",
                "live_aktual_selesai": live_details.get("actualEndTime", "") if is_live_content else "",
                "live_concurrent_viewers": live_details.get("concurrentViewers", "") if is_live_content else ""
            }
            all_metadata.append(data)
            
    return all_metadata

def save_to_csv(data_list, filename="metadata_youtube.csv"):
    if not data_list:
        print("Tidak ada video yang ditemukan.")
        return
        
    fieldnames = list(data_list[0].keys())
    with open(filename, mode="w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data_list)
    print(f"SUKSES! {len(data_list)} item berhasil disimpan ke file: {filename}")

if __name__ == "__main__":
    youtube_service = get_authenticated_service()
    uploads_id = get_uploads_playlist_id(youtube_service)
    ids = get_all_video_ids(youtube_service, uploads_id)
    print(f"Total video & rekaman live ditemukan: {len(ids)}")
    
    metadata = get_videos_metadata(youtube_service, ids)
    save_to_csv(metadata)
