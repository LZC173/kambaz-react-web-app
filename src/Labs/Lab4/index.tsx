
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables.tsx";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
import TodoList from "./ReduxExamples/todos/TodoList";
export default function Lab4() {
    function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4">
      <h3>Lab 4: Handling Click Events</h3>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables/>
      <DateStateVariable/>
      <ObjectStateVariable/>
      <ArrayStateVariable />
      <ParentStateComponent />
            <div>
      <ReduxExamples />
            <TodoList />
      </div>

    </div>
  );
}