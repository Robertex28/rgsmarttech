from PIL import Image

img = Image.open('D:/Imagenes/2024-07-04/smart technologyxxx.png').convert('RGBA')

bbox = img.getbbox()
print(f"Bounding box: {bbox}")
print(f"Tamaño original: {img.size}")

cropped = img.crop(bbox)
print(f"Tamaño recortado: {cropped.size}")

cropped.save('D:/RGSmart/contenido/assets/img/logo_nuevo.png')
print('Listo')