import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setNewTodo } from "../app/slices/todoSlice";
import $ from "jquery";

import "../asset/css/components/listContainer.css";
import TodoDetail from "../layout/list-container/todoDetail";

export default function ListContainer() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoList.list);

  // here is why our list has variuos animation delay which is cool

  useEffect(() => {
    // adding delay to pre-listed todos
    $(".listContainer").each(function (index) {
      $(this).css("animation-delay", `${index / 2.5}s`);
    });

    // lets remove animation delay after mounting
    $(".listContainer:last-child").on("animationend", function () {
      $(".listContainer").each(function () {
        $(this).removeAttr("style");
      });
    });
  }, []);

  // drag and drop

  let listFilterd;
  let insertIndex;

  const containerPicked = (item) => {
    listFilterd = list.filter((data) => data !== item);
  };

  const containerOnDrag = (ev, target) => {
    ev.preventDefault(); // cursor changes to draggable
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
    ev.preventDefault(); // cursor changes to draggable
    let target = ev.currentTarget;
    target.classList.add("dragto");
  };

  const containerDragLeave = (ev) => {
    ev.preventDefault(); // cursor changes to draggable
    if (
      ev.target.classList.contains("text-conatiner") ||
      ev.target.classList.contains("listContainer-text")
    )
      return;

    let target = ev.currentTarget;
    target.classList.remove("dragto");
  };

  let todoListResult = list.map((data, index) => {
    return (
      <div
        key={data.id}
        className="listContainer py-3 px-2"
        draggable="true"
        data-index={index}
        onDragStart={() => containerPicked(data)}
        onDragOver={(ev) => containerOnDrag(ev, ev.currentTarget.dataset.index)}
        onDragEnd={(ev) => containerOnDragEnd(ev, data)}
        onDragEnter={(ev) => containerDragEnter(ev)}
        onDragLeave={(ev) => containerDragLeave(ev)}
      >
        <TodoDetail data={data} index={index} />
      </div>
    );
  });

  return <>{todoListResult}</>;
}
