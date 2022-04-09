/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
*/
// selelect nav bar element for click event
const getTopBarSection = document.querySelector('ul'); 
//select go to the top function for the click event
const getSrollToTheTobBOTTOM = document.querySelector('.scrollButtomPosition');



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
//////////////////Helper Functions for DOMContentLoaded Event//////////////////
///////////////////////////////////////////////////////////////////////////////

* @description  creat nav bar elements and append this in the <ul>(unordered list) 
                debends on the number of sections 
                1)Select all sections, 
                2)loop on selected sections,
                3)creat <li> element, 
                4)creat <a> element, 
                5)add text and class to <a>, 
                6)append <a> to <li>
                7)append <li> to the document fragment, 
                8)out side loop append document fragment to the <ul> element. 
*/
const creatNavBarElements=()=>{
    //
    const sections= document.querySelectorAll('section'); 

    const Fragment = document.createDocumentFragment(); 
    for (let i = 0 ; i < sections.length ; i++)
   {    
        const listElement = document.createElement('li');   
        const anchorElement = document.createElement('a');   
        
        anchorElement.innerText="Section "+(i+1); 
        anchorElement.className="topMenueSection "+i; 
       
        
        listElement.appendChild(anchorElement); 
        Fragment.appendChild(listElement); 
    }
    const mainList = document.querySelector('#navbar__list');
    mainList.appendChild(Fragment);
}
/**
* @description  create scroll to the top button and append this in the <div> the 
                has class="scrollButtomPosition" 
                1)Select the container of the buttom <div>, 
                2)creat <input> element,
                3)set <input> element class name, 
                4)set <input> element  attributes(type: buttom , value: GO TO THE TOP), 
                5)append <input> to the document fragment, 
                6)append document fragment to the buttom container <div>,
*/
const placeButtom=()=>{
    const Fragment = document.createDocumentFragment(); 
    const buttomPosition = document.querySelector('.scrollButtomPosition');
    //create buttom;
    const buttom = document.createElement('input'); 
    
    //set an element attribute. 
    buttom.className="scrollButtom";
    buttom.setAttribute("type", 'buttom');
    buttom.setAttribute("value",'GO TO THE TOP')  
    
    //add text and class to buttom 
    Fragment.appendChild(buttom); 
    
    //append<a>to<li>
    buttomPosition.appendChild(Fragment);
}

/**
* @description to set the main element top margin to handle it specialy on mob phones 
* 
*/
function setResponsiveInvironment(event){
    
    const navBarBlock = document.querySelector('.page__header'); 
    const navBarBlockHeight = navBarBlock.offsetHeight; 
    const getMainElement = document.querySelector('main');
    const defaultValue = window.getComputedStyle(getMainElement).marginTop;

   
    getMainElement.style.marginTop=navBarBlockHeight+parseFloat(defaultValue) ;
}
/////////////////////Helper Functions for Scroll event////////////////////////
///////////////////////////////////////////////////////////////////////////////
/**
* @description  Remove active class from all <section>. 
                remove active class from all elements of navBar 
* @param {object} x selected sections elements 
* @param {object} y selected navBar elements
*/
const removeActiveSection=(x,y)=>{
    for(let i=0 ; i < x.length ; i++){
        if(x[i].classList.contains("your-active-class")){
            x[i].classList.remove("your-active-class");
            y[i].classList.remove("your-active-class");
        }
    }
}

/**
* @description  Add active class to certain section based on if condition
                and add active class to cross bonding navBar menu element
                and remove past active class by calling removeActiveSection function, 

                use flag to remove all active classes in case user in the top page 
                and there is not elements in view. 
                as in the case of there is not element in the view the if condition 
                will not be executed and the flag reman equal to one. 
* @param {object} x selected sections elements,  
* @param {object} y selected navBar elements, 
*/
const addActiveSection=(x,y)=>{
    let flag = 1; 
    for(let i = 0 ; i < x.length ; i++){ 
        if (x[i].getBoundingClientRect().top <= 300 ){
            removeActiveSection(x,y);

            x[i].classList.add("your-active-class");
            y[i].classList.add("your-active-class"); 
            flag = 0;
        }
    }
    if(flag){
        removeActiveSection(x,y);
    }
}

/**
* @description  Add and Remove class buttomVisability to the GO TO THE TOP Buttom
                if the top of exceed certain value
* @param {object} z
*/
const addButtom=z=>{
    const buttom = document.querySelector('.scrollButtom'); 
    if ((z.getBoundingClientRect().top) <= -100){
       buttom.classList.add("buttomVisability");
    }
    else{
        buttom.classList.remove("buttomVisability");
    }
}
/**
* @description  get h1 element to send to the addButtom function that set visiability
                of the buttom.
*/
const myScrollToAddButtom=()=>{
    const positonFromTheTop = document.querySelector('h1');
    addButtom(positonFromTheTop);
}

/**
* @description  get section element and navBar element to send to addActiveSection function 
                to highlight section and navBar.
*/
const myScrollToAddActiveSection=()=>{
    //get sections by element 
    const parts = document.querySelectorAll('section'); 
    //get top nav elements by class name 
    const getsection = document.querySelectorAll(".topMenueSection");
    addActiveSection(parts,getsection);
    
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav bar and Scroll to the top buttom 
/**
* @description  creat nav bar elements dynamically relative to the number of section 
                creat scroll to the top buttom . 
*/
const set=()=>{
    creatNavBarElements();
    placeButtom(); 
    setResponsiveInvironment();
}


// Add class 'active' to section when near top of viewport
/**
* @description  call handle function needed when scroll event call it.
*/
const myScroll=()=>{
    myScrollToAddButtom(); 
    myScrollToAddActiveSection(); 
}

// Scroll to anchor ID using scrollTO event

/**
* @description handle click event on the navBar elemnts to scroll to the requered section. 
                by get the class name of the navBar element
                (not we are already asigned this class when created navBar element in creatNavBarElements
                    as-topMenueSection "+i- where -i- is the index of the element and it's the same for
                    the section index crosponding to this element)
                we get the last char from the class Name which represent the navBar element index
                and use ParseInt function to convert it to number to allow access to the sections.  
*/
const clickEvent=(evt)=>{
    evt.preventDefault(); 
    const returnedvalue= evt.target.className;
    if (!returnedvalue) {
        return {
          error: true,
          message: 'clicked in wrong position'
        }
      }
    const forassignvalue = parseInt(returnedvalue.charAt(returnedvalue.length-1));
    const elmnts = document.querySelectorAll("section");
    elmnts[forassignvalue].scrollIntoView({behavior: "smooth" , block: "start", inline:"center"});
    
}
/**
* @description scroll to the top of the bage to handle the event when scroll to the top buttom clicked 
* @param {object} x
*/
const toTheTopBottomHandler=(x)=>{
    x.preventDefault();
    // FOR Sfari 
    document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });              
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });   // For Chrome, Firefox, IE and Opera
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu and Scroll to the top buttom 
document.addEventListener('DOMContentLoaded', set);

// Scroll to section on link click
document.addEventListener("scroll", myScroll);

// Set sections as active by press on the navBar element
getTopBarSection.addEventListener('click', clickEvent); 

// go to the top of the page when go to the top buttom clicked 
getSrollToTheTobBOTTOM.addEventListener('click',toTheTopBottomHandler);



