// frontend/src/App.jsx

import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    const completedCount = this.state.todoList.filter(
      item => item.completed
    ).length;
    const pendingCount = this.state.todoList.length - completedCount;

    return (
      <div className="tab-list" role="tablist" aria-label="Filtrar tarefas">
        <button
          type="button"
          role="tab"
          aria-selected={this.state.viewCompleted}
          onClick={() => this.displayCompleted(true)}
          className={`tab-button ${this.state.viewCompleted ? "active" : ""}`}
        >
          Concluídas <span className="tab-count">{completedCount}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!this.state.viewCompleted}
          onClick={() => this.displayCompleted(false)}
          className={`tab-button ${this.state.viewCompleted ? "" : "active"}`}
        >
          Pendentes <span className="tab-count">{pendingCount}</span>
        </button>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    if (newItems.length === 0) {
      return (
        <li className="empty-state">
          <div className="empty-state-mark" aria-hidden="true">
            ✓
          </div>
          <h3>
            {viewCompleted
              ? "Ainda não há tarefas concluídas"
              : "Tudo certo por aqui"}
          </h3>
          <p>
            {viewCompleted
              ? "As tarefas que você finalizar vão aparecer aqui."
              : "Adicione uma tarefa para começar a organizar seu dia."}
          </p>
        </li>
      );
    }

    return newItems.map(item => (
      <li
        key={item.id}
        className={`todo-row ${item.completed ? "completed-todo" : ""}`}
      >
        <div className="todo-copy">
          <button
            type="button"
            className="todo-toggle"
            onClick={() => this.handleToggle(item)}
            aria-label={
              item.completed
                ? `Marcar ${item.title} como pendente`
                : `Marcar ${item.title} como concluída`
            }
            aria-pressed={item.completed}
          >
            <span className="todo-marker" aria-hidden="true" />
          </button>
          <div className="todo-text">
            <div className="todo-title">{item.title}</div>
            {item.description && (
              <p className="todo-description">{item.description}</p>
            )}
          </div>
        </div>
        <div className="todo-actions">
          <button
            type="button"
            onClick={() => this.editItem(item)}
            className="task-action"
            aria-label={`Editar ${item.title}`}
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => this.handleDelete(item)}
            className="task-action task-action-delete"
            aria-label={`Excluir ${item.title}`}
          >
            Excluir
          </button>
        </div>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleToggle = item => {
    const updatedItem = { ...item, completed: !item.completed };
    axios
      .put(`http://localhost:8000/api/todos/${item.id}/`, updatedItem)
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    const totalTasks = this.state.todoList.length;

    return (
      <main className="app-shell">
        <div className="app-container">
          <header className="page-header">
            <div className="eyebrow">ORGANIZE SEU DIA</div>
            <h1>Um passo de cada vez.</h1>
            <p>Coloque as ideias no papel e siga no seu ritmo.</p>
          </header>
          <section className="todo-panel" aria-label="Lista de tarefas">
            <div className="panel-heading">
              <div>
                <h2 className="panel-title">Minha lista</h2>
                <p className="task-count">
                  {totalTasks} {totalTasks === 1 ? "tarefa" : "tarefas"} no total
                </p>
              </div>
              <button
                type="button"
                onClick={this.createItem}
                className="add-task-button"
              >
                + Nova tarefa
              </button>
            </div>
            {this.renderTabList()}
            <ul className="todo-list">{this.renderItems()}</ul>
          </section>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </div>
      </main>
    );
  }
}
export default App;
