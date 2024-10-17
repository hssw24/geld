import React, { useState, useEffect } from "react";

const euroValues = [
  { label: "1 Cent", value: 0.01, color: "#b87333", shape: "circle", radius: 20 }, // Kupfer
  { label: "2 Cent", value: 0.02, color: "#b87333", shape: "circle", radius: 25 }, // Kupfer
  { label: "5 Cent", value: 0.05, color: "#b87333", shape: "circle", radius: 30 }, // Kupfer
  { label: "10 Cent", value: 0.10, color: "#d4af37", shape: "circle", radius: 35 }, // Gold
  { label: "20 Cent", value: 0.20, color: "#d4af37", shape: "circle", radius: 40 }, // Gold
  { label: "50 Cent", value: 0.50, color: "#d4af37", shape: "circle", radius: 45 }, // Gold
  { label: "1 Euro", value: 1.00, color: "#c0c0c0", shape: "circle", radius: 50 }, // Silber mit Goldrand
  { label: "2 Euro", value: 2.00, color: "#c0c0c0", shape: "circle", radius: 55 }, // Silber mit Goldrand
  { label: "5 Euro", value: 5.00, color: "#007bff", shape: "rect", width: 120, height: 60 }, // Blaue Note
  { label: "10 Euro", value: 10.00, color: "#ff5733", shape: "rect", width: 120, height: 60 }, // Rote Note
  { label: "20 Euro", value: 20.00, color: "#3498db", shape: "rect", width: 120, height: 60 }, // Blaue Note
  { label: "50 Euro", value: 50.00, color: "#f39c12", shape: "rect", width: 120, height: 60 } // Orange Note
];

const EuroApp = () => {
  const [targetAmount, setTargetAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [clickStats, setClickStats] = useState({});
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksCorrect, setTasksCorrect] = useState(0);

  // Funktion zum Generieren eines zufälligen Betrags zwischen 0.01 und 100.00 Euro
  const generateRandomAmount = () => {
    const randomAmount = (Math.random() * 100).toFixed(2); // Zufallszahl mit 2 Dezimalstellen
    setTargetAmount(parseFloat(randomAmount));
    setPaidAmount(0);
    setMessage("");
    setClickStats({});
  };

  // Diese Funktion wird aufgerufen, wenn ein Button geklickt wird
  const handlePayment = (value, label) => {
    const newPaidAmount = (paidAmount + value).toFixed(2);
    setPaidAmount(parseFloat(newPaidAmount));

    // Update der Klickstatistik
    setClickStats((prevStats) => ({
      ...prevStats,
      [label]: (prevStats[label] || 0) + 1
    }));

    // Logik für die Nachricht, wenn der Betrag erreicht oder überschritten wurde
    if (parseFloat(newPaidAmount) === targetAmount) {
      setMessage("Gut gemacht! Du hast den richtigen Betrag bezahlt.");
      setTasksCompleted(tasksCompleted + 1); // Aufgabe abgeschlossen
      setTasksCorrect(tasksCorrect + 1); // Aufgabe richtig
    } else if (parseFloat(newPaidAmount) > targetAmount) {
      setMessage("Oops! Du hast zu viel bezahlt.");
      setTasksCompleted(tasksCompleted + 1); // Aufgabe abgeschlossen
    } else {
      setMessage("");
    }
  };

  // Beim ersten Laden der Seite einen zufälligen Betrag generieren
  useEffect(() => {
    generateRandomAmount();
  }, []);

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Bezahle den Betrag!</h1>
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Zielbetrag: {targetAmount.toFixed(2)} €</h2>
      <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Bezahlter Betrag: {paidAmount.toFixed(2)} €</h3>
      {message && <p style={{ fontSize: "16px", color: "green", marginBottom: "10px" }}>{message}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        {euroValues.map((coin, index) => (
          <button
            key={index}
            style={{
              padding: coin.shape === "rect" ? "10px 20px" : "15px",
              fontSize: "14px",
              borderRadius: coin.shape === "circle" ? "50%" : "5px",
              cursor: "pointer",
              backgroundColor: coin.color,
              color: "white",
              border: "none",
              transition: "background-color 0.3s",
              width: coin.shape === "circle" ? `${coin.radius * 2}px` : `${coin.width}px`,
              height: coin.shape === "circle" ? `${coin.radius * 2}px` : `${coin.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
            onClick={() => handlePayment(coin.value, coin.label)}
            disabled={paidAmount >= targetAmount} // Buttons deaktivieren, wenn das Ziel erreicht oder überschritten wurde
          >
            {coin.label}
          </button>
        ))}
      </div>

      <button
        onClick={generateRandomAmount}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none"
        }}
      >
        Neuen Betrag generieren
      </button>

      <div
        style={{
          marginTop: "20px",
          textAlign: "left",
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        <h3 style={{ fontSize: "18px" }}>Statistik: Anzahl der Klicks auf Münzen und Scheine</h3>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {euroValues.map((coin) => (
            <li key={coin.label} style={{ fontSize: "16px" }}>
              {coin.label}: {clickStats[coin.label] || 0} Klicks
            </li>
          ))}
        </ul>

        <h3 style={{ fontSize: "18px" }}>Aufgaben-Statistik</h3>
        <p style={{ fontSize: "16px" }}>Erledigte Aufgaben: {tasksCompleted}</p>
        <p style={{ fontSize: "16px" }}>Richtig erledigte Aufgaben: {tasksCorrect}</p>
      </div>
    </div>
  );
};

export default EuroApp;
