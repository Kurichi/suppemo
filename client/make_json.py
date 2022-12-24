from glob import glob

path = './assets/cards/*'

folders = glob(path)
card_details = []
card_folders = []
id = 0

for folder in folders:
    files = glob(f'{folder}/*')
    for file in files:
        name = file.split('/')[-1].split('.')[0]
        card_details.append({
            'id' : id,
            'name' : name,
            'uri' : file,
            'exists': True,
            'isDefault': True,
        })

with open('default_cards.json', 'w') as f:
    f.write(str(card_details))