var SelectedElement;
var MainDIV = document.getElementById("main_window");
var Elements;
var Options;

// Fetch Element from json file
fetch('elements/element.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        Elements = data;
        RenderElements(Elements);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

// Fetch Element from json file
fetch('elements/options.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        Options = data;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });



var toolbar = {
    up: document.getElementById("toolbar_up"),
    down: document.getElementById("toolbar_down"),
    delete: document.getElementById("toolbar_delete")
};

toolbar.up.addEventListener("click", up_element);
toolbar.down.addEventListener("click", down_element);
toolbar.delete.addEventListener("click", delete_element);



function up_element() {

    if (SelectedElement) {

        if (SelectedElement.previousElementSibling) {
            if (SelectedElement.previousElementSibling != MainDIV) {
                SelectedElement.previousElementSibling.appendChild(SelectedElement);
            }

        } else if (SelectedElement.parentElement) {

            if (SelectedElement.parentElement != MainDIV) {
                SelectedElement.parentElement.parentElement.prepend(SelectedElement);
            }

        }
    }
}

function down_element() {

    if (SelectedElement) {

        if (SelectedElement.nextElementSibling) {
            if (SelectedElement.nextElementSibling != MainDIV) {
                SelectedElement.nextElementSibling.appendChild(SelectedElement);
            }

        } else if (SelectedElement.parentElement) {

            if (SelectedElement.parentElement != MainDIV) {
                SelectedElement.parentElement.parentElement.appendChild(SelectedElement);
            }

        }
    }
}

function delete_element() {
    SelectedElement.remove();
    document.getElementById("selected_item_name").textContent = "";
    document.getElementById("element-tab-btn").click();
    editElement();
}

function onDragEnter(event) {
    add_border(event);
}

function onDragLeave(event) {
    delete_border(event)
}

function onDragStart(event) {

    event.dataTransfer.setData('text/plain', event.target.id);
    // event.currentTarget.style.backgroundColor = 'yellow';

}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {

    const id = event.dataTransfer.getData('text');
    const dropzone = event.target;


    let element = document.getElementById(id);
    let element_name = element.getAttribute("data-element");

    // CALL COMPONENT FUNCTION
    // let html = window[function_name];
    let html = Elements[element_name].html;

    // GET ELEMENT
    let child = document.createElement('span');
    child.innerHTML = html;
    child = child.firstElementChild
    console.log(child);

    // INSERT LOGIC
    const box = dropzone.getBoundingClientRect();
    const offset = event.clientY - box.top - (box.height / 2);

    if (dropzone.id != "main_body") {

        if (offset < 10 && offset > -10) {
            // Insert Inside
            console.log("Insert inside");
            dropzone.appendChild(child);

        } else if (offset < -10) {
            //Prepend
            console.log("Prepend");
            dropzone.parentElement.insertBefore(child, dropzone);


        } else if (offset > 10) {
            // Append
            console.log("Append");
            dropzone.parentElement.insertBefore(child, dropzone.nextElementSibling);
        }

    } else {
        dropzone.appendChild(child);
    }

    // SETUP
    event.dataTransfer.clearData();
    addAlleventListner();
}

function getID(event) {
    const element = event.target;

    console.log(element);

    if (SelectedElement) {
        SelectedElement.classList.remove("selected-outline");
    }

    SelectedElement = element;
    SelectedElement.classList.add("selected-outline");

    document.getElementById("selected_item_name").textContent = SelectedElement.tagName;

    document.getElementById("customize-tab-btn").click();
    editElement();
    CustomEditableOptions();
}

function getToolbar() {
    toolbar.style.display = "block";
}

function add_border(event) {
    const element = event.target;

    element.classList.add("selected-outline");

    if (element != SelectedElement) {
        element.classList.add("cursor-pointer");
    }
}

function delete_border(event) {
    const element = event.target;

    if (element != SelectedElement) {
        element.classList.remove("selected-outline");
    }
    element.classList.remove("cursor-pointer");
}

// Add eventlistners inside main div
function addAlleventListner(div_id = "main_div") {
    var elementsArray = document.getElementById("main_window").contentDocument.children;

    for (const child of elementsArray) {
        child.addEventListener("click", getID);
        child.addEventListener("mouseover", add_border);
        child.addEventListener("mouseout", delete_border);
    }
}


function CustomEditableOptions(){

    let option =  Options[SelectedElement.localName];

    let custom_option_accordion = document.getElementById("custom_option_accordion");
    custom_option_accordion.innerHTML = "";

    if(option){
        console.log(option);

        for(item in option){
           
            let div = document.createElement('div');
            div.className = "form-group"

            let form = document.createElement(option[item].formElement);
            form.setAttribute("type", option[item].formType);
            form.className = "form-control"

            let lable = document.createElement("label");
            lable.innerText = option[item].lable

            form.value = SelectedElement[option[item].valueName];

            form.addEventListener(option[item].eventlistner, () => {
              SelectedElement[option[item].valueName] = form.value;
            });

               
            div.appendChild(lable);
            div.appendChild(form);
            custom_option_accordion.appendChild(div);

        }

    }

    let div = document.createElement('div');
    div.className = "form-group"

    let form = document.createElement("INPUT");
    form.setAttribute("type", "text");
    form.className = "form-control"

    let lable = document.createElement("label");
    lable.innerText = "Add Class"

    form.value = SelectedElement.classList;

    form.addEventListener("focusout", () => {
      SelectedElement.classList = form.value;
    });

       
    div.appendChild(lable);
    div.appendChild(form);
    custom_option_accordion.appendChild(div);  
  
}

// All Editable Eventlistners
function editEventlistners() {

    // Display Tab========================

    // width settings
    let form_width = document.getElementById("form-width");
    form_width.addEventListener("input", () => {
        SelectedElement.style.width = form_width.value;
    });

    // height settings
    let form_height = document.getElementById("form-height");
    form_height.addEventListener("input", () => {
        SelectedElement.style.height = form_height.value;
    });

    // float setting
    let form_float = document.getElementById("form-float");
    form_float.addEventListener("change", () => {
        SelectedElement.classList.remove("float-left");
        SelectedElement.classList.remove("float-right");
        SelectedElement.classList.add(form_float.value);
    });

    // Display Tab========================

    // // Content Tab========================
    // // Text settings

    // let form_text = document.getElementById("form-text");
    // form_text.addEventListener("input", () => {
    //     SelectedElement.innerText = form_text.value;
    // });

    // // Content Tab========================

    // Typography=========================
    // Align settings
    let form_alignment = document.getElementById("form-alignment");
    form_alignment.addEventListener("change", () => {
        SelectedElement.classList.remove("text-center");
        SelectedElement.classList.remove("text-left");
        SelectedElement.classList.remove("text-right");
        SelectedElement.classList.add(form_alignment.value);
    });

    // FontWeight
    let form_font_weight = document.getElementById("form-font-weight");
    form_font_weight.addEventListener("change", () => {
        SelectedElement.style.fontWeight = form_font_weight.value;
    });

    // FontSize settings
    let form_fontSize = document.getElementById("form-fontSize");
    form_fontSize.addEventListener("input", () => {
        SelectedElement.style.fontSize = `${form_fontSize.value}px`;
    });
    // Typography=========================

    // Colors=========================

    // Color settings
    let form_Color = document.getElementById("form-Color");
    form_Color.addEventListener("input", () => {
        SelectedElement.style.color = `${form_Color.value}`;
    });

    // Background settings
    let form_BackgroundColor = document.getElementById("form-BackgroundColor");
    form_BackgroundColor.addEventListener("input", () => {
        SelectedElement.style.backgroundColor = `${form_BackgroundColor.value}`;
    });

    // Colors=========================

    // Margin=========================

    // margin-top
    let form_margintop = document.getElementById("form-margintop");
    let form_margintop_unit = document.getElementById("form-margintop-unit");

    form_margintop.addEventListener("input", () => {
        SelectedElement.style.marginTop = `${form_margintop.value}${form_margintop_unit.value}`;
    });

    form_margintop_unit.addEventListener("change", () => {
        SelectedElement.style.marginTop = `${form_margintop.value}${form_margintop_unit.value}`;
    });

    // margin-bottom
    let form_marginbottom = document.getElementById("form-marginbottom");
    let form_marginbottom_unit = document.getElementById("form-marginbottom-unit");

    form_marginbottom.addEventListener("input", () => {
        SelectedElement.style.marginBottom = `${form_marginbottom.value}${form_marginbottom_unit.value}`;
    });

    form_marginbottom_unit.addEventListener("change", () => {
        SelectedElement.style.marginBottom = `${form_marginbottom.value}${form_marginbottom_unit.value}`;
    });

    // margin-left
    let form_marginleft = document.getElementById("form-marginleft");
    let form_marginleft_unit = document.getElementById("form-marginleft-unit");

    form_marginleft.addEventListener("input", () => {
        SelectedElement.style.marginLeft = `${form_marginleft.value}${form_marginleft_unit.value}`;
    });

    form_marginleft_unit.addEventListener("change", () => {
        SelectedElement.style.marginLeft = `${form_marginleft.value}${form_marginleft_unit.value}`;
    });


    // margin-right
    let form_marginright = document.getElementById("form-marginright");
    let form_marginright_unit = document.getElementById("form-marginright-unit");

    form_marginright.addEventListener("input", () => {
        SelectedElement.style.marginRight = `${form_marginright.value}${form_marginright_unit.value}`;
    });

    form_marginright_unit.addEventListener("change", () => {
        SelectedElement.style.marginRight = `${form_marginright.value}${form_marginright_unit.value}`;
    });

    // Margin=========================

    // Padding=========================

    // padding-top
    let form_paddingtop = document.getElementById("form-paddingtop");
    let form_paddingtop_unit = document.getElementById("form-paddingtop-unit");

    form_paddingtop.addEventListener("input", () => {
        SelectedElement.style.paddingTop = `${form_paddingtop.value}${form_paddingtop_unit.value}`;
    });

    form_paddingtop_unit.addEventListener("change", () => {
        SelectedElement.style.paddingTop = `${form_paddingtop.value}${form_paddingtop_unit.value}`;
    });

    // padding-bottom
    let form_paddingbottom = document.getElementById("form-paddingbottom");
    let form_paddingbottom_unit = document.getElementById("form-paddingbottom-unit");

    form_paddingbottom.addEventListener("input", () => {
        SelectedElement.style.paddingBottom = `${form_paddingbottom.value}${form_paddingbottom_unit.value}`;
    });

    form_paddingbottom_unit.addEventListener("change", () => {
        SelectedElement.style.paddingBottom = `${form_paddingbottom.value}${form_paddingbottom_unit.value}`;
    });

    // padding-left
    let form_paddingleft = document.getElementById("form-paddingleft");
    let form_paddingleft_unit = document.getElementById("form-paddingleft-unit");

    form_paddingleft.addEventListener("input", () => {
        SelectedElement.style.paddingLeft = `${form_paddingleft.value}${form_paddingleft_unit.value}`;
    });

    form_paddingleft_unit.addEventListener("change", () => {
        SelectedElement.style.paddingLeft = `${form_paddingleft.value}${form_paddingleft_unit.value}`;
    });


    // padding-right
    let form_paddingright = document.getElementById("form-paddingright");
    let form_paddingright_unit = document.getElementById("form-paddingright-unit");

    form_paddingright.addEventListener("input", () => {
        SelectedElement.style.paddingRight = `${form_paddingright.value}${form_paddingright_unit.value}`;
    });

    form_paddingright_unit.addEventListener("change", () => {
        SelectedElement.style.paddingRight = `${form_paddingright.value}${form_paddingright_unit.value}`;
    });

    // Padding=========================

    // Background image =========================

    // URL
    let form_background_image_url = document.getElementById("form-background-image-url");

    form_background_image_url.addEventListener("focusout", () => {
        SelectedElement.style.backgroundImage = `url('${form_background_image_url.value}')`;
    });
    // Background image =========================

}

// All Editable Logic
function editElement() {

    let value;

    // Display Tab========================

    // width settings
    let form_width = document.getElementById("form-width");
    value = getStyle(SelectedElement, 'width');
    form_width.value = value;

    // height settings
    let form_height = document.getElementById("form-height");
    value = getStyle(SelectedElement, 'height');
    form_height.value = value;

    // float have to add------!!!!

    // Display Tab========================


    // // Content Tab========================
    // // Text settings
    // let form_text = document.getElementById("form-text");
    // form_text.focus();
    // form_text.value = SelectedElement.textContent;

    // // Content Tab========================

    // Typography=========================

    // Align settings
    let form_alignment = document.getElementById("form-alignment");
    form_alignment.value = SelectedElement.style.textAlign;

    // FontWeight
    let form_font_weight = document.getElementById("form-font-weight");
    form_font_weight.value = SelectedElement.style.fontWeight;

    // FontSize settings
    let form_fontSize = document.getElementById("form-fontSize");
    value = getStyle(SelectedElement, 'font-size');
    form_fontSize.value = parseInt(value);


    // Typography=========================

    // Colors=========================

    // Color settings
    let form_Color = document.getElementById("form-Color");
    value = getStyle(SelectedElement, 'color');
    form_Color.value = value;

    // Background settings
    let form_BackgroundColor = document.getElementById("form-BackgroundColor");
    value = getStyle(SelectedElement, 'background-color');
    form_BackgroundColor.value = value;


    // Colors=========================

    // Margin=========================

    // margin-top
    let form_margintop = document.getElementById("form-margintop");
    let form_margintop_unit = document.getElementById("form-margintop-unit");
    value = getStyle(SelectedElement, 'margin-top');
    form_margintop.value = parseInt(value);


    // margin-bottom
    let form_marginbottom = document.getElementById("form-marginbottom");
    let form_marginbottom_unit = document.getElementById("form-marginbottom-unit");
    value = getStyle(SelectedElement, 'margin-bottom');
    form_marginbottom.value = parseInt(value);


    // margin-left
    let form_marginleft = document.getElementById("form-marginleft");

    let form_marginleft_unit = document.getElementById("form-marginleft-unit");


    value = getStyle(SelectedElement, 'margin-left');
    form_marginleft.value = parseInt(value);


    // margin-right
    let form_marginright = document.getElementById("form-marginright");
    let form_marginright_unit = document.getElementById("form-marginright-unit");
    value = getStyle(SelectedElement, 'margin-right');
    form_marginright.value = parseInt(value);

    // Margin=========================


    // Padding=========================

    // padding-top
    let form_paddingtop = document.getElementById("form-paddingtop");
    let form_paddingtop_unit = document.getElementById("form-paddingtop-unit");
    value = getStyle(SelectedElement, 'padding-top');
    form_paddingtop.value = parseInt(value);


    // padding-bottom
    let form_paddingbottom = document.getElementById("form-paddingbottom");
    let form_paddingbottom_unit = document.getElementById("form-paddingbottom-unit");
    value = getStyle(SelectedElement, 'padding-bottom');
    form_paddingbottom.value = parseInt(value);


    // padding-left
    let form_paddingleft = document.getElementById("form-paddingleft");

    let form_paddingleft_unit = document.getElementById("form-paddingleft-unit");


    value = getStyle(SelectedElement, 'padding-left');
    form_paddingleft.value = parseInt(value);


    // padding-right
    let form_paddingright = document.getElementById("form-paddingright");
    let form_paddingright_unit = document.getElementById("form-paddingright-unit");
    value = getStyle(SelectedElement, 'padding-right');
    form_paddingright.value = parseInt(value);


    // Padding=========================

    // Background image =========================

    // URL
    let form_background_image_url = document.getElementById("form-background-image-url");
    value = getStyle(SelectedElement, 'background-image');
    form_background_image_url.value = value.slice(4, -1).replace(/"/g, "");


    // Background image =========================

}


// Get Stylesheet css
function getStyleCss(className) {
    var cssText = "";
    var classes = document.styleSheets[2].rules || document.styleSheets[2].cssRules;
    for (var x = 0; x < classes.length; x++) {
        if (classes[x].selectorText == className) {
            cssText += classes[x].cssText || classes[x].style.cssText;
        }
    }
    return cssText;
}


// Get computed style values
function getStyle(el, styleProp) {
    var camelize = function (str) {
        return str.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
        });
    };

    if (el.currentStyle) {
        return el.currentStyle[camelize(styleProp)];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(el, null)
            .getPropertyValue(styleProp);
    } else {
        return el.style[camelize(styleProp)];
    }
}


// Output the main html
function GetMainHtml() {
    let html = MainDIV.innerHTML;
    return html;
}

// Preview Page

function PreviewPage() {

    if (SelectedElement) {
        SelectedElement.classList.remove("selected-outline");
    }

    let html = GetMainHtml();
    let newWindow = window.open("pages/page.html", "height:100px; width:100px");
    setTimeout(function () {
        newWindow.postMessage(html, window.location.href)
    }, 1000);

}

// Css editor

var textareas = document.getElementById('cusomCssInput');
var count = textareas.length;
for (var i = 0; i < count; i++) {
  textareas[i].onkeydown = function (e) {
    if (e.keyCode == 9 || e.which == 9) {
      e.preventDefault();
      var s = this.selectionStart;
      this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
      this.selectionEnd = s + 1;
    }
  }
}


var EditorCSS;

// Setup
MainDIV.addEventListener("load",(event)=>{
        // console.log(MainDIV.contentDocument.body);

        MainDIV.contentDocument.body.ondragover = function(event){
            onDragOver(event);
        };
        MainDIV.contentDocument.body.ondrop = function(event){
            onDrop(event);
        };
        
        MainDIV.contentDocument.body.ondragenter = function(event){
            onDragEnter(event);
        };
        
        MainDIV.contentDocument.body.ondragleave = function(event){
            onDragLeave(event);
        };

        // DELETE KEY
        MainDIV.contentDocument.body.addEventListener('keydown', function (event) {
            const key = event.key;
            if (key === "Delete") {
                delete_element();
            }
        });

        // CSS Editor

        EditorCSS = ace.edit("cusomCssInput",{
            mode: "ace/mode/css",
            selectionStyle: "text"
        });

        // Css Editor Save Button Click
        document.getElementById('cusomCssInputSaveBtn').addEventListener("click",()=>{
            var cssText = EditorCSS.getValue();
            MainDIV.contentDocument.getElementById("customCssStyleSheet").innerHTML = cssText;
            document.getElementById("cusomCssInputCloseBtn").click();
        });
        
        document.getElementById('addCssBtn').addEventListener("click",()=>{       
            var cssText = MainDIV.contentDocument.getElementById("customCssStyleSheet").innerHTML;
            EditorCSS.setValue(cssText); ;
        });

        addAlleventListner();
        editEventlistners();
});


function RenderElements(items){
    var element_section = document.querySelector(".element_section");

    var html = "";

    for(element in items) {
        // console.table(items[element]);
        // console.log(element_section);

        html += `<div 
                    class="card" 
                    id="${element}_tag_nav" 
                    draggable="true" 
                    ondragstart="onDragStart(event);"
                    data-element="${element}">

                      <div class="card-body text-center">
                        <img src="${items[element].image}" width="30%"> 
                        <p>${items[element].heading}</p>
                      </div>
                </div>`
    
    }

    element_section.innerHTML = html;

  

}