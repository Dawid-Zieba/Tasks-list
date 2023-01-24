{
    let tasks = [];
    let hideDoneTasks = false;
  
    const addNewTask = (newTaskContent) => {
      tasks = [...tasks, { content: newTaskContent }];
      render();
    };
  
    const removeTask = (index) => {
      tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
      render();
    };
  
    const toggleTaskDone = (index) => {
      tasks = [
        ...tasks.slice(0, index),
        {
          ...tasks[index],
          done: !tasks[index].done,
        },
        ...tasks.slice(index + 1),
      ];
      render();
    };
  
    const markAllTasksDone = () => {
      tasks = tasks.map((task) => ({
        ...task,
        done: true,
      }));
      render();
    };
  
    const toggleHideDoneTasks = () => {
      hideDoneTasks = !hideDoneTasks;
      render();
    };
  
    const bindRemoveEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");
      removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
          removeTask(index);
        });
      });
    };
  
    const bindToggleDoneEvents = () => {
      const toggleDoneButtons = document.querySelectorAll(".js-done");
      toggleDoneButtons.forEach((toggleDoneButton, index) => {
        toggleDoneButton.addEventListener("click", () => {
          toggleTaskDone(index);
        });
      });
    };
  
    const renderTasks = () => {
      const taskToHTML = (task) => `
            <li class="
              tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""
              } js-task
            "> 
              <button class="tasks__button tasks__button--done js-done">
               ${task.done ? "✔" : ""}
              </button>
              <span class="tasks${task.done ? " tasks__content--done" : ""}">
               ${task.content}
              </span>
              <button class="tasks__button tasks__button--remove js-remove">
              🗑
              </button>
            </li>
        `;
      const tasksElement = document.querySelector(".js-tasks");
      tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };
  

  
    const bindButtonsEvents = () => {
      const markAllDoneButton = document.querySelector(".js-markAllDone");
  
      if (markAllDoneButton) {
        markAllDoneButton.addEventListener("click", markAllTasksDone);
      }
  
      const toggleHideDoneTasksButton = document.querySelector(
        ".js-toggleHideDoneTasks"
      );
  
      if (toggleHideDoneTasksButton) {
        toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
      }
    };
  
    const render = () => {
      renderTasks();
      bindRemoveEvents();
      bindToggleDoneEvents();
  
      renderButtons();
      bindButtonsEvents();
    };
  
    const onFormSubmit = (event) => {
      event.preventDefault();
  
      const newTaskContent = document.querySelector(".js-newTask").value.trim();
      const newTaskElement = document.querySelector(".js-newTask");
  
      if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = "";
      }
      newTaskElement.focus();
    };
  
    const init = () => {
      render();
  
      const form = document.querySelector(".js-form");
  
      form.addEventListener("submit", onFormSubmit);
    };
    init();
  }