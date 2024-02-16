import { useState } from "react";

function App() {
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [diaries, setDiaries] = useState([]);
  const [selectedDiary, setSelectedDiary] = useState(null);
  const [showDiary, setShowDiary] = useState(false);

  function handleSelectedDiary(date) {
    setSelectedDiary((cur) => date);
    handleShowDiary();
  }

  function handleDiaries(diary) {
    console.log(diary);
    setDiaries((diaries) => [...diaries, diary]);
  }

  function handleDiary(e) {
    e.preventDefault();

    if (!date || !text) return;

    const newDiary = {
      date: date,
      text: text,
    };

    handleDiaries(newDiary);

    setDate("");
    setText("");
  }

  function handleShowDiary() {
    setShowDiary((show) => !show);
  }

  return (
    <div className="app">
      <DailyRecord
        diaries={diaries}
        handleSelectedDiary={handleSelectedDiary}
      />

      {showDiary === true ? (
        <HistoryRecord
          selectedDiary={selectedDiary}
          handleSelectedDiary={handleSelectedDiary}
          handleShowDiary={handleShowDiary}
        />
      ) : (
        <NewRecord
          date={date}
          handleDate={setDate}
          text={text}
          handleText={setText}
          handleDiary={handleDiary}
        />
      )}
    </div>
  );
}

// left
function NewRecord({ date, handleDate, text, handleText, handleDiary }) {
  return (
    <form className="form-new-record" onSubmit={handleDiary}>
      <label>date</label>
      <input
        type="date"
        className="form-item"
        min={new Date().toJSON().slice(0, 10)}
        value={date}
        onChange={(e) => handleDate(e.target.value)}
      ></input>

      <label for="diary">Anything want to say?</label>
      <textarea
        id="diary"
        name="diary"
        className="form-item form-text"
        placeholder="write something down"
        rows="20"
        cols="5"
        value={text}
        onChange={(e) => handleText(e.target.value)}
      ></textarea>

      <button className="button">That's all</button>
    </form>
  );
}

function HistoryRecord({ selectedDiary, handleShowDiary }) {
  return (
    <div className="historyDiv">
      <label className="historyTitle">{selectedDiary?.date}</label>

      <p className="historyText" rows="20" cols="5">
        {selectedDiary?.text}
      </p>

      <button className="button historyButton" onClick={handleShowDiary}>
        close
      </button>
    </div>
  );
}

// right
function DailyRecord({ diaries, handleSelectedDiary }) {
  return (
    <div className="flashcards">
      <p className="title">Daily Record</p>
      {diaries.map((date) => (
        <DailyCard date={date} handleSelectedDiary={handleSelectedDiary} />
      ))}
    </div>
  );
}

function DailyCard({ date, handleSelectedDiary }) {
  return (
    <div className="flashcard" onClick={() => handleSelectedDiary(date)}>
      {date.date}
    </div>
  );
}

export default App;
