let elementDrag;
let elementDrop;

function ItemDragStart(element) {
  elementDrag = element;
}

function ItemDragOver(element) {
  // eslint-disable-next-line
  event.preventDefault();
  elementDrop = element;
}

function ItemDrop() {
  // eslint-disable-next-line
  event.stopPropagation();
  const taskArray = JSON.parse(localStorage.getItem('taskArray'));

  let dragIndex;
  let dragCompleted;
  let dragDescription;

  let dropIndex;
  let dropCompleted;
  let dropDescription;

  if (elementDrag.getAttribute('index') !== elementDrop.getAttribute('index')) {
    localStorage.clear();

    for (let idx = 0; idx < taskArray.length; idx += 1) {
      const element = taskArray[idx];
      // eslint-disable-next-line
      if (element.index == elementDrag.getAttribute('index')) {
        dragIndex = element.index;
        dragCompleted = element.completed;
        dragDescription = element.description;
      }
      // eslint-disable-next-line
      if (element.index == elementDrop.getAttribute('index')) {
        dropIndex = element.index;
        dropCompleted = element.completed;
        dropDescription = element.description;
      }
    }

    elementDrop.setAttribute('description', dragDescription);
    elementDrop.setAttribute('completed', dragCompleted);
    elementDrop.setAttribute('index', dragIndex);

    elementDrop.querySelector('p').innerHTML = dragDescription;
    elementDrop.querySelector('input').checked = !!dragCompleted;

    elementDrag.setAttribute('description', dropDescription);
    elementDrag.setAttribute('completed', dropCompleted);
    elementDrag.setAttribute('index', dropIndex);

    elementDrag.querySelector('p').innerHTML = dropDescription;
    elementDrag.querySelector('input').checked = !!dropCompleted;

    const newTaskArray = [...taskArray];

    while (newTaskArray[dragIndex].index !== taskArray[dropIndex].index
      || newTaskArray[dropIndex].index !== taskArray[dragIndex].index) {
      newTaskArray[dragIndex] = taskArray[dropIndex];
      newTaskArray[dropIndex] = taskArray[dragIndex];
      localStorage.clear();
      localStorage.setItem('taskArray', JSON.stringify(newTaskArray));
    }
  }
}

function AddDragEvents(element) {
  element.addEventListener('dragstart', () => ItemDragStart(element));
  element.addEventListener('dragover', () => ItemDragOver(element));
  element.addEventListener('drop', () => ItemDrop());
}

// eslint-disable-next-line
export { AddDragEvents };