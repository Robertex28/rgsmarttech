from PIL import Image

img = Image.open('D:/Imagenes/2024-07-04/smart technologyxxx.png').convert('RGBA')

# Recortar al contenido real
bbox = img.getbbox()
cropped = img.crop(bbox)

# Hacer cuadrado perfecto
size = max(cropped.size)
square = Image.new('RGBA', (size, size), (0, 0, 0, 0))
offset = ((size - cropped.size[0]) // 2, (size - cropped.size[1]) // 2)
square.paste(cropped, offset)

# Redimensionar a 200x200 limpio
final = square.resize((200, 200), Image.LANCZOS)
final.save('D:/RGSmart/contenido/assets/img/logo_nuevo.png')
print(f'Listo - guardado 200x200')