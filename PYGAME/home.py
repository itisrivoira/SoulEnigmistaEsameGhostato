
global opzioni
opzioni=0

global run
run=True
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


def apriOpzioni():
    global opzioni
    opzioni=1

def chiudiOpzioni():
    global opzioni
    opzioni=0

def  alza():
    pygame.mixer.music.set_volume(pygame.mixer.music.get_volume()+0.100)

def  abbassa():
    pygame.mixer.music.set_volume(pygame.mixer.music.get_volume()-0.100)

def disegna_oggetti(): 
    SCREEN.blit(sfondo,(0,0))
    SCREEN.blit(logo,(130,0))
    if opzioni==0:
        for b in buttons:
            if b.opt==0:
                b.draw()
    else:
        for b in buttons:
            if b.opt==1:
                b.draw()
        volume=int(pygame.mixer.music.get_volume()*100) 
        myfont = pygame.font.SysFont('Comic Sans MS', 50)
        volume = myfont.render(str(volume), False, (255, 255, 255))
        ScrittaV = myfont.render("VOLUME", False, (255, 255, 255))

        SCREEN.blit(volume,(500,250))
        SCREEN.blit( ScrittaV,(460,200))

def aggiorna():
    pygame.display.update()  


import pygame,sys
pygame.init() 


#tutte le immagini da inizializzare
icona = pygame.image.load('img/fantasmaPixel.png') 
sfondo=pygame.image.load("img/sfondo.jpeg")
logo=pygame.image.load("img/logo.png")
logo=pygame.transform.smoothscale(logo, (772, 222))

pygame.mixer.music.load("audio/Imagine.mp3")
pygame.mixer.music.play(-1)   #play della colonna sonora -1 indica per tempo infinito
pygame.mixer.music.set_volume(0.500)


SCREEN = pygame.display.set_mode((1071,770))
pygame.display.set_icon(icona)
pygame.display.set_caption("SOUL'ENIGMISTA")
gui_font = pygame.font.Font(None,30)
buttons=[]
opt=apriOpzioni
alz=alza
abb=abbassa
home=chiudiOpzioni
button = Button(0,'#007FFF','#0066CC','Play',200,40,(440,250),5)
button = Button(0,'#007FFF','#0066CC','Option',200,40,(440,350),5,opt)
button = Button(1,'#000000','#333333','+',40,40,(450,250),5,alz)
button = Button(1,'#000000','#333333','-',40,40,(570,250),5,abb)
button = Button(1,'#007FFF','#0066CC','Home',200,40,(440,300),5,home)



while run:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    SCREEN.fill('#DCDDD8')
    disegna_oggetti()
    aggiorna()

	     