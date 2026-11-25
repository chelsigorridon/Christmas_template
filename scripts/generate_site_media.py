from array import array
from math import exp, pi, sin
from pathlib import Path
import random
import wave

from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def font(path: Path, size: int, fallback: str = "C:/Windows/Fonts/georgia.ttf"):
    source = path if path.exists() else Path(fallback)
    return ImageFont.truetype(str(source), size=size)


def make_share_card():
    width, height = 1200, 630
    random.seed(20261225)
    image = Image.new("RGB", (width, height), "#f5f0e6")
    pixels = image.load()
    for y in range(height):
        for x in range(width):
            grain = random.choices((-3, -2, -1, 0, 1, 2, 3), weights=(1, 4, 12, 62, 12, 4, 1))[0]
            warm = int(2 * (1 - abs(x - width / 2) / (width / 2)))
            base = (245 + grain + warm, 240 + grain + warm, 230 + grain + warm)
            pixels[x, y] = tuple(max(0, min(255, value)) for value in base)

    draw = ImageDraw.Draw(image)
    gold, burgundy, green = "#b69a60", "#762d2d", "#183a2d"
    draw.rectangle((30, 28, 1170, 602), outline="#c8b47e", width=2)
    draw.rectangle((38, 36, 1162, 594), outline="#e1d3b3", width=1)

    branch_font = font(PUBLIC / "fonts" / "wonderia.otf", 94)
    body_font = font(Path("C:/Windows/Fonts/georgia.ttf"), 29)
    small_font = font(Path("C:/Windows/Fonts/arial.ttf"), 18)
    tiny_font = font(Path("C:/Windows/Fonts/arial.ttf"), 14)

    draw.text((105, 118), "A LITTLE CHRISTMAS POST", font=tiny_font, fill=burgundy, spacing=6)
    draw.text((99, 166), "You’re", font=branch_font, fill=green)
    draw.text((99, 260), "invited.", font=branch_font, fill=burgundy)
    draw.line((105, 392, 535, 392), fill=gold, width=2)
    draw.polygon([(320, 385), (327, 392), (320, 399), (313, 392)], fill=gold)
    draw.text((105, 420), "Christmas Lunch", font=body_font, fill=green)
    draw.text((105, 473), "The Williams Family", font=body_font, fill=burgundy)
    draw.text((105, 535), "FRIDAY, 25 DECEMBER 2026  ·  12:30 PM", font=small_font, fill="#777466")

    # A dimensional envelope illustration anchors the right side of the share card.
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((676, 206, 1086, 486), radius=9, fill=(38, 23, 18, 66))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    image = Image.alpha_composite(image.convert("RGBA"), shadow)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((666, 190, 1076, 470), radius=7, fill="#762d2d", outline="#b69a60", width=7)
    draw.rectangle((682, 206, 1060, 454), outline="#e4c98c", width=2)
    draw.polygon([(682, 207), (871, 344), (1060, 207)], fill="#8b3935")
    draw.line((682, 207, 871, 344, 1060, 207), fill="#b58c54", width=3)
    draw.polygon([(682, 454), (871, 333), (1060, 454)], fill="#6c2929")
    draw.ellipse((838, 316, 904, 382), fill="#8d3c35", outline="#d6b978", width=5)
    draw.ellipse((847, 325, 895, 373), outline="#e2c781", width=2)
    draw.polygon([(871, 330), (876, 341), (887, 349), (876, 356), (871, 367), (866, 356), (855, 349), (866, 341)], fill="#f0d995")

    # Simple holly sprigs and berries echo the invitation’s botanical accents.
    draw.line((1045, 112, 1111, 57), fill="#52684a", width=4)
    for box in [(1022, 88, 1058, 112), (1051, 70, 1086, 94), (1081, 52, 1118, 76)]:
        draw.ellipse(box, fill="#768367", outline="#52684a", width=2)
    for point in [(1052, 104), (1084, 83), (1105, 65)]:
        x, y = point
        draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill=burgundy)
    draw.text((688, 525), "A little something lovely is waiting inside.", font=small_font, fill="#777466")

    image.convert("RGB").save(PUBLIC / "og-christmas-invitation.png", optimize=True)


def add_tone(buffer, sample_rate, start, duration, frequency, volume, voice="pad"):
    start_sample = max(0, int(start * sample_rate))
    end_sample = min(len(buffer), int((start + duration) * sample_rate))
    for index in range(start_sample, end_sample):
        elapsed = (index - start_sample) / sample_rate
        remaining = (end_sample - index) / sample_rate
        if voice == "bell":
            envelope = min(1.0, elapsed / 0.045) * exp(-2.25 * elapsed) * min(1.0, remaining / 0.08)
            value = sin(2 * pi * frequency * elapsed) + 0.28 * sin(2 * pi * frequency * 2.01 * elapsed)
        else:
            attack = min(1.0, elapsed / 0.8)
            release = min(1.0, remaining / 0.75)
            envelope = attack * release
            value = sin(2 * pi * frequency * elapsed) + 0.18 * sin(2 * pi * frequency * 2.002 * elapsed)
        buffer[index] += value * volume * envelope


def make_music_loop():
    sample_rate = 22050
    bar = 60 / 68 * 4
    duration = bar * 8
    samples = array("f", [0.0]) * int(sample_rate * duration)
    chords = [
        (130.81, 164.81, 196.00, 246.94),
        (110.00, 130.81, 164.81, 196.00),
        (87.31, 110.00, 130.81, 164.81),
        (98.00, 130.81, 146.83, 196.00),
        (130.81, 164.81, 196.00, 246.94),
        (110.00, 130.81, 164.81, 196.00),
        (98.00, 130.81, 146.83, 174.61),
        (98.00, 123.47, 146.83, 196.00),
    ]
    for index, chord in enumerate(chords):
        start = index * bar
        for note in chord:
            add_tone(samples, sample_rate, start, bar + 0.7, note, 0.018, "pad")

    melody = (523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 392.00,
              440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 440.00, 392.00)
    beat = 60 / 68
    for index, note in enumerate(melody):
        start = 0.35 + index * beat * 2
        add_tone(samples, sample_rate, start, 1.55, note, 0.095, "bell")
        add_tone(samples, sample_rate, start + 0.24, 1.2, note * 2, 0.017, "bell")

    peak = max(abs(value) for value in samples) or 1.0
    scale = 0.76 / peak
    audio_path = PUBLIC / "audio" / "soft-christmas.wav"
    audio_path.parent.mkdir(parents=True, exist_ok=True)
    pcm = array("h", (int(max(-1.0, min(1.0, value * scale)) * 32767) for value in samples))
    with wave.open(str(audio_path), "wb") as output:
        output.setnchannels(1)
        output.setsampwidth(2)
        output.setframerate(sample_rate)
        output.writeframes(pcm.tobytes())


if __name__ == "__main__":
    make_share_card()
    make_music_loop()
