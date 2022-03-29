
import pygame,sys
pygame.init() 

clock = pygame.time.Clock()
clock.tick(60)
global oggetti
oggetti=[]

#tutte le immagini da inizializzare
icona = pygame.image.load('img/fantasmaPixel.png') 
sfondo=pygame.image.load("img/sfondo.jpeg")
sfondoGioco=pygame.image.load("img/5C.jpg")
logo=pygame.image.load("img/logo.png")
banco=pygame.image.load("img/banchi.jpg")
armadio=pygame.image.load("img/armadio.jpg")
cestini=pygame.image.load("img/cestini.jpg")
lavagna=pygame.image.load("img/lavagna.jpg")
cattedra=pygame.image.load("img/cattedra.jpg")
logo=pygame.transform.smoothscale(logo, (772, 222))

global schermata
schermata="Home"

global run
run=True

class Oggetto:
    def __init__(self,img,width,heigth,x,y):
        self.img=img
        self.heigth=heigth
        self.width=width
        self.x=x
        self.x2=x+width
        self.y=y
        self.y2=y+heigth
        oggetti.append(self)
        
         
    def draw(self):
        SCREEN.blit(self.img,(self.x,self.y))

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

    def vaiSu(self):
        self.vely-=4

    def vaiGiu(self):
        self.vely+=4

    def vaiDx(self):
        self.velx+=4

    def vaiSx(self):
        self.velx-=4

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

def  alza():
    pygame.mixer.music.set_volume(pygame.mixer.music.get_volume()+0.100)

def  abbassa():
    pygame.mixer.music.set_volume(pygame.mixer.music.get_volume()-0.100)

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

        SCREEN.blit(volume,(500,250))
        SCREEN.blit( ScrittaV,(460,200))

def gioco():
    SCREEN.blit(sfondo,(0,0))
    SCREEN.blit(sfondoGioco,(200,0))
    for oggetto in oggetti:
        oggetto.draw()
    SCREEN.blit(personaggio.image,(personaggio.x,personaggio.y))
    for b in buttons:
        if b.opt==2:
            b.draw()

        
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

        SCREEN.blit(volume,(500,250))
        SCREEN.blit( ScrittaV,(460,200))

def aggiorna():
    pygame.display.update()  


pygame.mixer.music.load("audio/Imagine.mp3")
pygame.mixer.music.play(-1)   #play della colonna sonora -1 indica per tempo infinito
pygame.mixer.music.set_volume(0.500)


SCREEN = pygame.display.set_mode((1071,770))
pygame.display.set_icon(icona)
pygame.display.set_caption("SOUL'ENIGMISTA")


gui_font = pygame.font.Font(None,30)
buttons=[]
aOpt=apriOpzioni
alz=alza
abb=abbassa
aHome=apriHome
aGioco=apriGioco
aOptGioco=apriOptGioco
Button(0,'#007FFF','#0066CC','Play',200,40,(440,250),5,aGioco)
Button(0,'#007FFF','#0066CC','Option',200,40,(440,350),5,aOpt)
Button(1,'#000000','#333333','+',40,40,(450,250),5,alz)
Button(1,'#000000','#333333','-',40,40,(570,250),5,abb)
Button(1,'#007FFF','#0066CC','Home',200,40,(440,300),5,aHome)
Button(2,'#007FFF','#0066CC','Option',200,40,(870,50),5,aOptGioco)
Button(2,'#007FFF','#0066CC','Home',200,40,(870,100),5,aHome)
Button(4,'#000000','#333333','+',40,40,(450,250),5,alz)
Button(4,'#000000','#333333','-',40,40,(570,250),5,abb)
Button(4,'#007FFF','#0066CC','Torna al gioco',200,40,(440,300),5,aGioco)

Oggetto(armadio,32,64,808,160)
Oggetto(cestini,64,64,232,32)
Oggetto(lavagna,64,64,520,-5)
Oggetto(cattedra,64,96,712,32)
xO=135
yO=160
x=xO
y=yO

for i in range(1,20):

    if(i==3 or i==7 or i==11 or i==15):
        x+=160
        Oggetto(banco,32,64,x,y)
        x=xO
        y+=96
    else:
        x+=160
        Oggetto(banco,32,64,x,y)

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
        posx=personaggio.x+personaggio.velx
        posy=personaggio.y+personaggio.vely
        move=0
        if(posx<200+633 and posx>200 and posy>32 and posy<580):
            for oggetto in oggetti:
                if(posx>oggetto.x-20 and posx<oggetto.x2-20 and posy>oggetto.y-30 and posy<oggetto.y2-20):
                    move=1
            if (move==0):
                personaggio.x+=personaggio.velx
                personaggio.y+=personaggio.vely
        gioco()
        for evento in pygame.event.get():

            if(evento.type == pygame.KEYUP and (evento.key == pygame.K_UP or evento.key == pygame.K_DOWN or evento.key == pygame.K_RIGHT or evento.key == pygame.K_LEFT)):
                    personaggio.ferma()
            elif(evento.type == pygame.KEYDOWN):
                if(evento.key == pygame.K_UP):
                    personaggio.vaiSu()
                elif(evento.key == pygame.K_DOWN):
                    personaggio.vaiGiu()
                elif(evento.key == pygame.K_RIGHT):
                    personaggio.vaiDx()
                elif(evento.key == pygame.K_LEFT):
                    personaggio.vaiSx()
            if evento.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
                            
                    
    elif schermata == "opzioniGioco":
        opzioniGioco()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
    aggiorna()

	     