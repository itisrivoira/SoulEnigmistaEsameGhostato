
import pygame,sys
pygame.init() 
FPS=60
clock = pygame.time.Clock()
clock.tick(FPS)


oggetti=[]

icona5C=[]

schermata="Home"

run=True

flagLav=False

def nulla():
    pass

global mostraScher
mostraScher=nulla

global flag
flag=0

global mostraOgg
mostraOgg=[]

global strumenti
strumenti=[]

global mostraZaino
mostraZaino=nulla

global Bag
Bag=[]

global WIDTH
WIDTH=1071

global HEIGTH
HEIGTH=770


#impostazione schermo
SCREEN = pygame.display.set_mode((WIDTH,HEIGTH))


#tutte le immagini da inizializzare
icona = pygame.image.load('img/fantasmaPixel.png').convert_alpha()
sfondo=pygame.image.load("img/sfondo.jpeg").convert()
#inizializzatzione stanze
classe5C=pygame.image.load("img/5C.jpg").convert()
logo=pygame.image.load("img/logo.png").convert_alpha()
#inizializzazione oggetti delle stanze
computer=pygame.image.load("img/computer.jpg").convert_alpha()
registro=pygame.image.load("img/registro.png").convert_alpha()
appBlocc=pygame.image.load("img/appBlocc.png").convert_alpha()
banco=pygame.image.load("img/banchi.png").convert_alpha()
armadio=pygame.image.load("img/armadio.png").convert_alpha()
cestini=pygame.image.load("img/cestino.png").convert_alpha()
lavagna=pygame.image.load("img/lavagnaO.png").convert_alpha()
schermataLav=pygame.image.load("img/lavagna.png").convert_alpha()
cattedra=pygame.image.load("img/cattedra.jpg").convert_alpha()
corridoio=pygame.image.load("img/corridoio.png").convert_alpha()
porta=pygame.image.load("img/porta.png").convert_alpha()
schermataArm=pygame.image.load("img/armadioApertoVuoto.png").convert()
acqua=pygame.image.load("img/acqua.jpg").convert_alpha()
so3=pygame.image.load("img/so3.jpeg").convert_alpha()
acido=pygame.image.load("img/acido.jpg").convert_alpha()
logo=pygame.transform.smoothscale(logo, (772, 222))
zaino=pygame.transform.smoothscale(classe5C, (200, 200))
bancoChimica=pygame.image.load("img/Banco2.png").convert_alpha()

pygame.display.set_icon(icona)
pygame.display.set_caption("SOUL'ENIGMISTA")

class Oggetto:
    def __init__(self,classe="",img="",width=0,heigth=0,x=0,y=0,funz=lambda: print("Nessuna interazione")):
        self.img=img
        self.heigth=heigth
        self.width=width
        self.x=x
        self.x2=x+width
        self.y=y
        self.y2=y+heigth
        self.interazione=funz
        self.classe=classe
        
        oggetti.append(self)
        
         
    def draw(self):
        SCREEN.blit(self.img,(self.x,self.y))

class Strumento:
    def __init__(self,nome="",img="",x=0,y=0,width=0,heigth=0):
        self.img=img
        self.x=x
        self.y=y     
        self.x2=x+width
        self.y2=y+heigth
        self.nome=nome
        strumenti.append(self)

    def mostraOgg(self):
        SCREEN.blit(self.img,(self.x,self.y))

class Icona:
    def __init__(self,img="",x=0,y=0):
        self.img=img
        self.x=x
        self.y=y
        icona5C.append(self)
        
         
    def draw(self):
        SCREEN.blit(self.img,(self.x,self.y))

class Stanza:
    def __init__(self,img="",x=0,y=0,width=0,heigth=0,classe="",xSoul=0,ySoul=0):
        self.img=img
        self.x=x
        self.y=y 
        self.width=width
        self.heigth=heigth
        self.classe=classe #identificativo per capire in che stanza ci troviamo durante il gioco
        

    def draw(self):
        SCREEN.blit(self.img,(self.x,self.y))
#assegno alle stanze la funzione Stanza

stz5c=Stanza(classe5C,200,0,630,580,"5C")
stzCorridoio=Stanza(corridoio,100,0,832,220,"corridoio")
stzChimica=Stanza(classe5C,200,0,630,580,"Chimica")
miaStanza=stz5c
class Button:
        
    def __init__(self,opt=0,topColor="#FFFFFF",botColor="#DDDDDD",text="niente",width=0,height=0,pos=(0,0),elevation=0,command=lambda: print("No command activated for this button")):
        #Core attributes 
            self.pressed = False
            self.elevation = elevation
            self.dynamic_elecation = elevation
            self.original_y_pos = pos[1]
            self.command=command
            self.color1=topColor
            self.color2=botColor
            self.opt=opt


            # top rectangle 
            self.top_rect = pygame.Rect(pos,(width,height))
            self.top_color = topColor

            # bottom rectangle 
            self.bottom_rect = pygame.Rect(pos,(width,height))
            self.bottom_color = botColor
            #text
            self.text = text
            self.text_surf = gui_font.render(text,True,'#FFFFFF')
            self.text_rect = self.text_surf.get_rect(center = self.top_rect.center)
            buttons.append(self)

    def change_text(self, newtext):
        self.text_surf = gui_font.render(newtext, True,'#FFFFFF')
        self.text_rect = self.text_surf.get_rect(center = self.top_rect.center)

    def draw(self):
        # elevation logic 
        self.top_rect.y = self.original_y_pos - self.dynamic_elecation
        self.text_rect.center = self.top_rect.center 

        self.bottom_rect.midtop = self.top_rect.midtop
        self.bottom_rect.height = self.top_rect.height + self.dynamic_elecation

        pygame.draw.rect(SCREEN,self.bottom_color, self.bottom_rect,border_radius = 12)
        pygame.draw.rect(SCREEN,self.top_color, self.top_rect,border_radius = 12)
        SCREEN.blit(self.text_surf, self.text_rect)
        self.check_click()

    def check_click(self):
        mouse_pos = pygame.mouse.get_pos()
        if self.top_rect.collidepoint(mouse_pos):
            self.top_color = self.color2
            if pygame.mouse.get_pressed()[0]:
                self.dynamic_elecation = 0
                self.pressed = True
            else:
                self.dynamic_elecation = self.elevation
                if self.pressed == True:
                    self.command()
                    self.pressed = False
        else:
            self.dynamic_elecation = self.elevation
            self.top_color = self.color1


class Soul:
    def __init__(self):
        self.x=600
        self.y=100
        self.image=pygame.image.load("img/fantasmaPixel.png")
        self.velx=0
        self.vely=0
        self.heigth=32
        self.width=32
        self.direzione=""

    def vaiSu(self):
        self.vely-=5

    def vaiGiu(self):
        self.vely+=5

    def vaiDx(self):
        self.velx+=5

    def vaiSx(self):
        self.velx-=5

    def ferma(self):
        self.vely=0
        self.velx=0


def apriOpzioni():
    global schermata
    schermata="Opzioni"

def apriHome():
    global schermata
    schermata="Home"

def apriGioco():
    global schermata
    schermata="Gioco"

def apriOptGioco():
    global schermata
    schermata="opzioniGioco"

def apriZaino():
    i=0
    SCREEN.blit(zaino,(0,0))
    for obj in Bag:
        obj.x=i*50
        print(i)
        obj.y=0
        obj.mostraOgg()
        i=i+1
        

def  alza():
    pygame.mixer.music.set_volume(pygame.mixer.music.get_volume()+0.100)

def  abbassa():
    pygame.mixer.music.set_volume(pygame.mixer.music.get_volume()-0.100)



def apriSchermata(schermata,x,y):
    SCREEN.blit(schermata,(x,y))

def apriComputer5C():
    SCREEN.blit(computer,(246,120))
    for i in icona5C:
        i.draw()

def funz_mostraZaino():
        global mostraZaino
        
        global flag
        if flag==0:
            flag=1
            mostraZaino=nulla
        else:
            flag=0
            mostraZaino=apriZaino


def aggOggSch(oggetti,assegna):
    assegna()
    flag=0
    for oggetto in oggetti:
        for obj in Bag:
                if oggetto.nome==obj.nome:
                    flag=1
        if flag==0:
            mostraOgg.append(oggetto)


def cambiaStanza(stanza,xSoul,ySoul):
    global sfondoGioco
    global miaStanza
    miaStanza=stanza
    personaggio.x=xSoul
    personaggio.y=ySoul

def assegna(funzione):#Permette di mantenere a video le schermate stile lavagna,computer,....
    global mostraScher
    mostraScher=funzione

# ISTANZIAMENTO BOTTONI

gui_font = pygame.font.Font(None,30)
buttons=[]
aOpt=apriOpzioni
alz=alza
abb=abbassa
aHome=apriHome
aGioco=apriGioco
Button(0,'#007FFF','#0066CC','Play',200,40,(440,250),5,aGioco)
Button(0,'#007FFF','#0066CC','Option',200,40,(440,350),5,aOpt)
Button(1,'#000000','#333333','+',40,40,(405,320),5,alz)
Button(1,'#000000','#333333','-',40,40,(605,320),5,abb)
Button(1,'#007FFF','#0066CC','Home',200,40,(420,420),5,aHome)
Button(4,'#000000','#333333','+',40,40,(405,320),5,alz)
Button(4,'#000000','#333333','-',40,40,(605,320),5,abb)
Button(4,'#007FFF','#0066CC','Torna al gioco',200,40,(420,420),5,aGioco)

#Istanziamento Oggetti


Icona(registro,400,250)
Icona(appBlocc,600,250)
Oggetto("5C",armadio,32,64,808,160)
Oggetto("5C",cestini,64,32,232,64)
Oggetto("5C",lavagna,64,64,520,-5,lambda: assegna(lambda:apriSchermata(schermataLav,246,120)))
Oggetto("5C",cattedra,64,96,712,32,lambda: assegna(apriComputer5C))
Oggetto("5C",porta,32,32,200,96,lambda: cambiaStanza(stzCorridoio,896,128))

Oggetto("corridoio",porta,32,128,928,96,lambda: cambiaStanza(stz5c,232,96))
Oggetto("corridoio",porta,64,32,160,64,lambda: cambiaStanza(stzChimica,768,556))

strAcqua=Strumento("acqua",acqua,500,200,32,32)
strSo3=Strumento("so3",so3,600,200,32,32)
Oggetto("Chimica",porta,64,32,746,588,lambda: cambiaStanza(stzCorridoio,160,96))
Oggetto("Chimica",armadio,32,64,320,32,lambda:aggOggSch([strAcqua,strSo3],lambda: assegna(lambda:apriSchermata(schermataArm,246,120))))
Oggetto("Chimica",bancoChimica,129,97,320,150,lambda:assegna( lambda:apriSchermata(computer,246,120))) #modificare

#creazione banchi
xO=135
yO=160
x=xO
y=yO

for i in range(1,20):

    if(i==3 or i==7 or i==11 or i==15):
        x+=160
        Oggetto("5C",banco,32,32,x,y)
        x=xO
        y+=96
    else:
        x+=160
        Oggetto("5C",banco,32,32,x,y)


def home(): 
    SCREEN.blit(sfondo,(0,0))
    SCREEN.blit(logo,(130,0))
    for b in buttons:
        if b.opt==0:
            b.draw()


def opzioni():
    SCREEN.blit(sfondo,(0,0))
    SCREEN.blit(logo,(130,0))
    for b in buttons:
        if b.opt==1:
            b.draw()
        volume=int(pygame.mixer.music.get_volume()*10) 
        myfont = pygame.font.SysFont('Comic Sans MS', 50)
        volume = myfont.render(str(volume), False, (255, 255, 255))
        ScrittaV = myfont.render("VOLUME", False, (255, 255, 255))

        SCREEN.blit(volume,(500,300))
        SCREEN.blit( ScrittaV,(420,230))

def gioco():

    SCREEN.blit(sfondo,(0,0))
    miaStanza.draw()
    for oggetto in oggetti:
        if (oggetto.classe==miaStanza.classe):
            oggetto.draw()

    SCREEN.blit(personaggio.image,(personaggio.x,personaggio.y))
    mostraScher()
    for obj in mostraOgg:
        obj.mostraOgg()
    mostraZaino()

        
def opzioniGioco():
    SCREEN.blit(sfondo,(0,0))
    SCREEN.blit(logo,(130,0))
    for b in buttons:
        if b.opt==4:
            b.draw()
        volume=int(pygame.mixer.music.get_volume()*10) 
        myfont = pygame.font.SysFont('Comic Sans MS', 50)
        volume = myfont.render(str(volume), False, (255, 255, 255))
        ScrittaV = myfont.render("VOLUME", False, (255, 255, 255))

        SCREEN.blit(volume,(500,300))
        SCREEN.blit( ScrittaV,(420,230))

def aggiorna():
    pygame.display.update()  


#Audio
pygame.mixer.music.load("audio/Imagine.mp3")
pygame.mixer.music.play(-1)   #play della colonna sonora -1 indica per tempo infinito
pygame.mixer.music.set_volume(0.500)





global personaggio
personaggio=Soul()

while run:
    
    if schermata == "Home":
        home()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
    elif schermata == "Opzioni":
        opzioni()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
    elif schermata == "Gioco":

        #gestire collisioni

        posx=personaggio.x+personaggio.velx
        posy=personaggio.y+personaggio.vely
        move=0
        if(posx<miaStanza.x+miaStanza.width and posx>miaStanza.x and posy>miaStanza.y+64 and posy<miaStanza.y+miaStanza.heigth):
            for oggetto in oggetti:
                if(oggetto.classe==miaStanza.classe and posx>oggetto.x-personaggio.width and posx<oggetto.x2-10 and posy>oggetto.y-personaggio.heigth and posy<oggetto.y2-(personaggio.width/2)):
                    move=1
            if (move==0):
                personaggio.x+=personaggio.velx
                personaggio.y+=personaggio.vely

        gioco()

        #GESTIRE EVENTI

        for evento in pygame.event.get():

            if(evento.type == pygame.KEYUP and (evento.key == pygame.K_UP or evento.key == pygame.K_DOWN or evento.key == pygame.K_RIGHT or evento.key == pygame.K_LEFT)):
                    personaggio.ferma()
            elif(evento.type == pygame.KEYDOWN):
                if(evento.key == pygame.K_UP):
                    personaggio.vaiSu()
                    personaggio.direzione="SU"
                elif(evento.key == pygame.K_DOWN):
                    personaggio.vaiGiu()
                    personaggio.direzione="GIU"
                elif(evento.key == pygame.K_RIGHT):
                    personaggio.vaiDx()
                    personaggio.direzione="DX"
                elif(evento.key == pygame.K_LEFT):
                    personaggio.vaiSx()     
                    personaggio.direzione="SX"
                elif(evento.key == pygame.K_c):
                    mostraScher=nulla
                    mostraOgg=[]
                elif(evento.key == pygame.K_o):
                    apriOptGioco()
                elif(evento.key == pygame.K_h):
                    apriHome()
                elif(evento.key == pygame.K_m):
                    funz_mostraZaino()
                elif(evento.key == pygame.K_RETURN):
                    if(personaggio.direzione=="SX"):
                        dirx=personaggio.x-32
                        diry=personaggio.y
                        for oggetto in oggetti:
                            if(dirx>oggetto.x-personaggio.width and dirx<oggetto.x2-10 and diry>oggetto.y-personaggio.heigth and diry<oggetto.y2-(personaggio.width/2)):
                                oggetto.interazione()
                    elif(personaggio.direzione=="DX"):
                        dirx=personaggio.x+32
                        diry=personaggio.y
                        for oggetto in oggetti:
                                if(dirx>oggetto.x-personaggio.width and dirx<oggetto.x2-10 and diry>oggetto.y-personaggio.heigth and diry<oggetto.y2-(personaggio.width/2)):
                                    oggetto.interazione()
                    elif(personaggio.direzione=="SU"):
                        dirx=personaggio.x
                        diry=personaggio.y-32
                        for oggetto in oggetti:
                            if(dirx>oggetto.x-personaggio.width and dirx<oggetto.x2-10 and diry>oggetto.y-personaggio.heigth and diry<oggetto.y2-(personaggio.width/2)):
                                oggetto.interazione()
                    elif(personaggio.direzione=="GIU"):
                        dirx=personaggio.x
                        diry=personaggio.y+32
                        for oggetto in oggetti:
                            if(dirx>oggetto.x-personaggio.width and dirx<oggetto.x2-10 and diry>oggetto.y-personaggio.heigth and diry<oggetto.y2-(personaggio.width/2)):
                                oggetto.interazione()

            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            
            if evento.type ==pygame.MOUSEBUTTONDOWN:
                x,y=evento.pos
                for str in strumenti:
                    if x>str.x and x<str.x2 and y>str.y and y<str.y2:
                        mostraOgg.remove(str)
                        Bag.append(str)
                    
                    
                    
    elif schermata == "opzioniGioco":
        opzioniGioco()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
    aggiorna()

	     
