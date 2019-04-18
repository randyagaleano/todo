var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><rect x="2" y="3" width="20" height="2"/><path d="M4,6v16.5C4,23.3,4.7,24,5.5,24h13.1c0.8,0,1.5-0.7,1.5-1.5V6H4z M11,22h-1V9h1V22z M14,22h-1V9h1V22z M17,22h-1V9h1V22z   M8,22H7V9h1V22z"/><path style="fill:none;stroke: lightgray;stroke-width:2.0803;stroke-miterlimit:10;" d="M16,4H8V3.3C8,2,9,1,10.3,1h3.5  C15,1,16,2,16,3.3V4z"/></svg>'
var completeSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve" width="50px" height="50px"><path d="M25,3C12.87,3,3,12.87,3,25s9.87,22,22,22s22-9.87,22-22S37.13,3,25,3z M35.83,16.56L24.32,33.53l-9-8.35  c-0.4-0.38-0.43-1.01-0.05-1.42c0.37-0.4,1.01-0.42,1.41-0.05l7.29,6.76l10.2-15.03c0.31-0.46,0.94-0.58,1.39-0.27  C36.02,15.48,36.14,16.1,35.83,16.56z"/></svg>'

// Adds the text user enters into the todo list
// doesn't add anything if value left empty
document.getElementById('add').addEventListener('click', 
    function() {
        var value = document.getElementById('item').value;
        if (value) {
            addItem(value);
        }
    }
);

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter') && value) {
        addItem(value);
    }
});

function addItem (value) {
    console.log(value)
    addItemToDOM(value);
    document.getElementById('item').value = '';
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = this.parentNode.parentNode.parentNode;

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = this.parentNode.parentNode.parentNode;
    var id = parent.id;

    // check if task belongs in completed or todo
    var target = (id === "todo") 
        ? document.getElementById('completed')
        : document.getElementById('todo')

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

// Adds users todo item to the list
function addItemToDOM(text, completed) {
    var list = (completed) 
        ? document.getElementById('completed')
        : document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    // add functionality for removing task
    remove.addEventListener('click', removeItem)

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    // add functionality for completing task
    complete.addEventListener('click', completeItem)

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);

}
