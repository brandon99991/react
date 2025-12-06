import React, { useEffect, useState } from "react";

function App() {
  // 📌 처음 렌더링 전에 localStorage에서 초기값 로딩
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

  // ✏ 현재 어떤 메모를 수정 중인지 (인덱스), 없으면 null
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // 🔹 notes가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (e) {
      console.error("localStorage 저장 에러:", e);
    }
  }, [notes]);

  // 메모 추가
  const addNote = () => {
    if (input.trim() === "") return;
    setNotes([...notes, input]);
    setInput("");
  };

  // 메모 삭제
  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));

    // 삭제하면서 수정 중이던 줄까지 지워진 경우 처리
    if (editIndex === index) {
      setEditIndex(null);
      setEditValue("");
    }
  };

  // 메모 수정 모드로 전환
  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(notes[index]);
  };

  // 메모 수정 저장
  const saveEdit = () => {
    if (editValue.trim() === "") return;

    const updated = notes.map((note, i) =>
      i === editIndex ? editValue : note
    );
    setNotes(updated);
    setEditIndex(null);
    setEditValue("");
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>한 줄 노트</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메모 입력"
      />
      <button onClick={addNote}>추가</button>

      <ul>
        {notes.map((n, i) => (
          <li key={i} style={{ marginTop: 8 }}>
            {editIndex === i ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ marginRight: 8 }}
                />
                <button onClick={saveEdit}>저장</button>
                <button onClick={cancelEdit} style={{ marginLeft: 4 }}>
                  취소
                </button>
              </>
            ) : (
              <>
                {n}
                <button
                  onClick={() => startEdit(i)}
                  style={{ marginLeft: 8 }}
                >
                  수정
                </button>
                <button
                  onClick={() => deleteNote(i)}
                  style={{ marginLeft: 4 }}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
