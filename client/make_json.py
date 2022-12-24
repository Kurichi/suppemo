from glob import glob
import json

path = "./assets/cards/*"

folders = glob(path)
card_details = []
card_folders = []
folder_id = 0
id = 0

for folder in folders:
    files = glob(f"{folder}/*")
    ids = []
    for file in files:
        name = file.split("/")[-1].split('.')[0]
        card_details.append({
            "id" : id,
            "name" : name,
            "uri" : "require(" + file + ")",
            "count": 0,
            "createdDate": "",
            "isDefault": True,
            "exists": True,
        })
        ids.append(id)
        id += 1
    name = folder.split("/")[-1]
    card_folders.append({
        "id": folder_id,
        "iconName": name,
        "type": 'feather',
        "background_color": 'white',
        "cards_ids": ids,
    })

with open("default_cards.json", 'w') as f:
    json.dump(card_details, f, ensure_ascii=False)
with open("default_card_folders.json", 'w') as f:
    json.dump(card_folders, f, ensure_ascii=False)