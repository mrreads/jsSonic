class GamePlayer
{
    constructor(id, height, width, field, img)
    {
        this.field =  field.element;
        this.height = height;
        this.width = width;
        if (!document.querySelector(`#${id}`)) { this.field.innerHTML += `<div id="${ id }"></div>`; }
        this.element = document.querySelector(`#${id}`);
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.position = "absolute";
        this.element.style.top = 155 + 'px';
        this.element.style.left = (field.width / 2 - this.width) + 'px';
        this.element.style.backgroundImage = 'url("'+img+'")';

        this.rings = 0;
        this.lives = 3;
        this.isGround = false;
        this.jumpForce = 25;
        this.mass = 2;
        this.keyboardControl();
        this.isJumping = false;
        this.initGravitation();
        this.initDebug();
        this.initScroll();
    }

    move(value)
    {
        if (!((parseInt(this.element.style.left) + parseInt(value)) > (parseInt(this.field.style.width) - parseInt(this.element.style.width)))) 
        {
            let counter = 0;
            let move = setInterval(function () 
            {
                if (counter == Math.abs(value)) 
                {
                    clearInterval(move);
                } 
                else 
                {
                    let temp;
                    counter++;
                    if (value >= 0) 
                    {
                        temp = parseInt(this.element.style.left) + 1;
                    } 
                    else 
                    {
                        temp = parseInt(this.element.style.left) - 1;
                    }
                    if (temp > 0) 
                    {
                        this.element.style.left = temp + "px";
                    }
                }

                if ((parseInt(this.element.style.left) + parseInt(this.width)) > parseInt(this.field.style.width))
                {
                    let temp = (parseInt(this.field.style.width) - parseInt(this.element.style.width));
                    this.element.style.left = temp + 'px';
                }
            }.bind(this), 1000/60);
        }
    }

    keyboardControl()
    {
        document.addEventListener('keypress', function (event) 
        {
            if (event.code == 'KeyA') 
            {
                this.move(-23);
            }
            if (event.code == 'KeyD') 
            {
                this.move(23);
            }
            if (event.code == 'KeyW') 
            {
                if (this.isJumping == false & this.isGround == true)
                {
                    this.jump();
                }
            }
        }.bind(this));
        
    }

    initDebug()
    {
        this.debug = document.createElement("div");
        this.field.appendChild(this.debug);
        this.debug.classList.add('debug');
        this.debugText = document.createElement("p");
        document.querySelector('.debug').appendChild(this.debugText);
        this.debugText = document.createElement("p");
        document.querySelector('.debug').appendChild(this.debugText);

        setInterval(function()
        {   
            document.querySelector(".debug p:nth-child(1)").textContent = `Rings: ${this.rings}`;
            document.querySelector(".debug p:nth-child(2)").textContent = `Lives: ${this.lives}`;
        }.bind(this), 1000/60);
    }

    initGravitation()
    {
        setInterval(function()
        {
            
            let temp;
            if ((parseInt(this.element.style.top) + parseInt(this.element.style.height)) < (parseInt(this.field.style.height)))
            {
                temp = parseInt(this.element.style.top) + this.mass;
                this.element.style.top = temp + 'px';
                
                if (this.isGround != true || this.isJumping == true)
                {
                    this.mass = this.mass + 1;
                }
                else
                {
                    this.mass = 2;
                }
            }
        }.bind(this), 1000/60);
    }

    jump()
    {
        let counter = 0;
        this.isJumping = true;
        
        let jump = setInterval(function () 
        {
            if (counter == 10) 
            {
                this.isJumping = false;
                clearInterval(jump);
            } 
            let temp;
            temp = parseInt(this.element.style.top) - parseInt(this.jumpForce);
            this.element.style.top = temp + 'px';
            counter++;
        }.bind(this), 1000/60);
    }

    initScroll()
    {
        this.objects = [];
        setInterval(function()
        {
            if ((parseInt(this.element.style.left) + parseInt(this.element.style.width)) > (parseInt(this.field.style.width) / 2 + 150))
            {
                this.temp = ((parseInt(this.field.style.width) / 2 + 150) - parseInt(this.element.style.width));
                this.element.style.left = this.temp + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
                    this.temp = parseInt(this.objects[i].style.left) - 1;
                    this.objects[i].style.left = this.temp + "px";
                }
            }

            if ((parseInt(this.element.style.left) < 2))
            {
                this.element.style.left = 2 + 'px';

                this.objects = this.field.children;

                for (let i = 1; i < this.objects.length; i++)
                {
                    this.temp = parseInt(this.objects[i].style.left) + 1;
                    this.objects[i].style.left = this.temp + "px";
                }
            }

        }.bind(this), 1);
    }
}