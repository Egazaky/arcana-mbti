"""Lossless, unscaled crops of the user-supplied 1131 × 1600 sheets.
Run from the project root with Python + Pillow. Artwork is never redrawn.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'references/original-artwork'
OUTPUT = ROOT / 'src/assets/cards'

MBTI = {
    'INTJ': (113, 164, 328, 468), 'INTP': (348, 164, 563, 468),
    'ENTJ': (578, 164, 793, 468), 'ENTP': (812, 164, 1027, 468),
    'ENFJ': (112, 497, 328, 801), 'INFP': (345, 497, 561, 801),
    'INFJ': (578, 497, 794, 801), 'ENFP': (812, 497, 1028, 801),
    'ISFP': (117, 830, 333, 1134), 'ISTP': (350, 830, 566, 1134),
    'ESFP': (584, 830, 800, 1134), 'ESTP': (818, 830, 1035, 1134),
    'ISFJ': (117, 1163, 333, 1467), 'ISTJ': (350, 1163, 566, 1467),
    'ESFJ': (583, 1163, 799, 1467), 'ESTJ': (816, 1163, 1033, 1467),
}
ANSWERS = {
    'dark-1': (61, 452, 218, 673), 'dark-2': (278, 452, 435, 673),
    'dark-3': (488, 452, 645, 673), 'dark-4': (705, 452, 862, 673),
    'dark-5': (913, 452, 1070, 673),
    'light-1': (60, 772, 217, 994), 'light-2': (273, 772, 431, 994),
    'light-3': (488, 772, 645, 994), 'light-4': (700, 772, 858, 994),
    'light-5': (913, 772, 1070, 994),
}

for sheet, folder, boxes in [('mbti-sheet.png', 'mbti', MBTI), ('answer-sheet.png', 'answers', ANSWERS)]:
    original = Image.open(SOURCE / sheet)
    assert original.size == (1131, 1600), 'Crop coordinates require the original sheet size'
    target = OUTPUT / folder
    target.mkdir(parents=True, exist_ok=True)
    for name, box in boxes.items():
        original.crop(box).save(target / f'{name}.png', optimize=True)
    print(f'Extracted {len(boxes)} original {folder} cards')
