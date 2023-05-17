import { useDispatch } from "react-redux";
import { removeTodo, todosDone } from "../../app/slices/todoSlice";
import $ from "jquery";
import PropTypes from "prop-types";

function TodoDetail({ data, index }) {
  const dispatch = useDispatch();
  const { done, id, text } = data;

  const ButtonGenerator = () => {
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

  const todoRemover = () => {
    // remove with animation by adding "deactive class"

    $(".listContainer").eq(index).addClass("deactive");

    $(".listContainer")
      .eq(index)
      .on("animationend", function () {
        dispatch(removeTodo(id)); // this happens when animations end
      });
  };

  return (
    <>
      <div className="flex items-center text-conatiner">
        <p
          className={
            !done
              ? "mr-auto text-gray-700 listContainer-text relative "
              : "mr-auto text-emerald-500 decoration-emerald-500 line-through listContainer-text relative"
          }
        >
          <span className="before"></span>
          {text}
        </p>

        {ButtonGenerator(data)}

        <button
          onClick={() => todoRemover()}
          className="p-1 px-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </>
  );
}

TodoDetail.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

export default TodoDetail;
