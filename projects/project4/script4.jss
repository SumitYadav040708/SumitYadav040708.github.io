body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

#question {
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
}

#options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.option {
  padding: 10px;
  background: #e3f2fd;
  border-radius: 4px;
  cursor: pointer;
}

.option:hover {
  background: #bbdefb;
}

#next-btn {
  padding: 10px 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: none; /* Hidden by default */
  margin: 0 auto;
}

#next-btn:hover {
  background: #45a049;
}

#result {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}
