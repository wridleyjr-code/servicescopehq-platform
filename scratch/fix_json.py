import json
import re

with open('../data/niches.json', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
head_lines = []
in_conflict = False
keep = True
for line in lines:
    if line.startswith('<<<<<<<'):
        in_conflict = True
        keep = True
        continue
    if line.startswith('======='):
        keep = False
        continue
    if line.startswith('>>>>>>>'):
        in_conflict = False
        keep = True
        continue
    
    if keep:
        head_lines.append(line)

head_json = '\n'.join(head_lines)
try:
    data = json.loads(head_json)
    with open('../data.js', 'w', encoding='utf-8') as out:
        out.write('const localDatabase = ' + json.dumps(data, indent=2) + ';\n')
    print("Success HEAD")
except Exception as e:
    print("Failed HEAD parse:", e)
