// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css"; // 👈 스타일 가져오기

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("localStorage 파싱 에러:", e);
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (e) {
      console.error("localStorage 저장 에러:", e);
    }
  }, [notes]);

  const addNote = () => {
    if (input.trim() === "") return;
    setNotes([...notes, input]);
    setInput("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(notes[index]);
  };

  const saveEdit = () => {
    if (editValue.trim() === "") return;
    const updated = notes.map((note, i) =>
      i === editIndex ? editValue : note
    );
    setNotes(updated);
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="app-background">
      <div className="note-card">
        <h2 className="note-title">한 줄 노트</h2>

        <div className="note-input-row">
          <input
            className="note-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="오늘 떠오른 생각을 적어보세요 ✏️"
          />
          <button className="btn btn-primary" onClick={addNote}>
            추가
          </button>
        </div>

        {notes.length === 0 ? (
          <p className="empty-text">아직 메모가 없어요. 첫 메모를 남겨보세요!</p>
        ) : (
          <ul className="note-list">
            {notes.map((n, i) => (
              <li key={i} className="note-item">
                {editIndex === i ? (
                  <div className="note-edit-row">
                    <input
                      className="note-input flex-1"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={saveEdit}>
                      저장
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={cancelEdit}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className="note-view-row">
                    <span className="note-text">{n}</span>
                    <div className="note-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => startEdit(i)}
                      >
                        수정
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteNote(i)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
