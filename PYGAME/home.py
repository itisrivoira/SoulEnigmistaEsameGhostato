import pygame #guarda file spiegazione.txt
import button #per i pulsanti
#mettere uno sfondo l'immagine sfondo.png di sara 
Xfin=1920
Yfin=1080
pygame.init() 
#tutte le immagini da iniazializzare
homeSfondo=pygame.image.load(./img/sfondo.png)#prova da modificare
bt1=pygame.image.load(./img/bt_accedi.png)

class Button():
    def __init__ (self,x,y,image):
        self.image=image
        self.rect =self.image.get_rect() #capire a che serve sta riga 
        self.rect.topleft =(x,y)
schermofondo=pygame.display.set_mode((Xfin,Yfin))


pygame.display.update()







