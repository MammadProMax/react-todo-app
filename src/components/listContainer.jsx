import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeTodo, todosDone, setNewTodo } from "../app/slices/todoSlice";
import $ from "jquery";

import "../asset/css/components/listContainer.css";

export default function ListContainer() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoList.list);

  // here is why our list has variuos animation delay which is cool

  useEffect(() => {
    // adding delay to pre-listed todos
    $(".listContainer").each(function (index) {
      $(this).css("animation-delay", `${index / 2.5}s`);
    });

    // lets remove delay after mounting
    $(".listContainer:last-child").on("animationend", function () {
      $(".listContainer").each(function () {
        $(this).css("animation-delay", "0s");
      });
    });
  }, []);

  const todoRemover = (id, index) => {
    // remove with animation by adding "deactive class"

    $(".listContainer").eq(index).addClass("deactive");

    $(".listContainer")
      .eq(index)
      .on("animationend", function () {
        dispatch(removeTodo(id)); // this happens when animations end
      });
  };

  // drag and drop
  let listFilterd;
  let insertIndex;
  const containerPicked = (ev, item) => {
    listFilterd = list.filter((data) => data !== item);
  };
  const containerOnDrag = (target) => {
    insertIndex = target;
  };
  const containerOnDragEnd = (ev, data) => {
    ev.preventDefault();

    listFilterd.splice(insertIndex, 0, data);
    dispatch(setNewTodo(listFilterd));
    $(".listContainer.dragto").removeClass("dragto");
    $(".listContainer .listContainer-text .before").removeAttr("style");
  };
  const containerDragEnter = (ev) => {
    let target = ev.currentTarget;
    target.classList.add("dragto");
  };
  const containerDragLeave = (ev) => {
    if (
      ev.target.classList.contains("text-conatiner") ||
      ev.target.classList.contains("listContainer-text")
    )
      return;

    let target = ev.currentTarget;
    target.classList.remove("dragto");
  };

  const ButtonGenerator = (data) => {
    const { done, id } = data;

    const classProps = {
      done: "p-1 px-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-600 hover:bg-green-600",
      notDone:
        "p-1 px-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray-400 hover:bg-gray-400",
    };

    return (
      <button
        onClick={() => dispatch(todosDone({ id }))}
        className={!done ? classProps.done : classProps.notDone}
      >
        {!done ? "Done" : "Undone"}
      </button>
    );
  };

  let todoListResult = list.map((data, index) => {
    return (
      <div
        key={data.id}
        className="listContainer py-3 pl-1"
        draggable="true"
        data-index={index}
        onDragStart={(ev) => containerPicked(ev, data)}
        onDragOver={(ev) => containerOnDrag(ev.currentTarget.dataset.index)}
        onDragEnd={(ev) => containerOnDragEnd(ev, data)}
        onDragEnter={(ev) => containerDragEnter(ev)}
        onDragLeave={(ev) => containerDragLeave(ev)}
      >
        <div className="flex items-center text-conatiner">
          <p
            className={
              !data.done
                ? "mr-auto text-gray-700 listContainer-text relative "
                : "mr-auto text-emerald-500 decoration-emerald-500 line-through listContainer-text relative"
            }
          >
            <span className="before"></span>
            {data.text}
          </p>

          {ButtonGenerator(data)}

          <button
            onClick={() => todoRemover(data.id, index)}
            className="p-1 px-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    );
  });

  return <>{todoListResult}</>;
}
