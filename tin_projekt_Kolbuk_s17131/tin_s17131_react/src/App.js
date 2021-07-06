import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer'
import EmployeeList from './components/employee/EmployeeList'
import EmployeeDetails from './components/employee/EmployeeDetails'
import EmployeeForm from './components/employee/EmployeeForm'
import HistoryList from './components/history/HistoryList'
import HistoryDetails from './components/history/HistoryDetails'
import HistoryForm from './components/history/HistoryForm'
import TrainingList from './components/training/TrainingList'
import TrainingDetails from './components/training/TrainingDetails'
import TrainingForm from './components/training/TrainingForm'


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navigation />
        <Switch>
          {/* po wejściu pod adres /employees dopasowana zostałaby ścieżka / jako pierwsza pasująca i załadowany zostałby komponent 
           strony głównej (MainContent). Dodając parametr exact definiujemy, że adres musi być dokładnie taki jak zdefiniowany w ścieżce. */}
          <Route exact path="/" component={MainContent} />
          <Route exact path="/employees" component={EmployeeList} />
          <Route exact path="/employees/details/:empId" component={EmployeeDetails} />
          <Route exact path="/employees/add" component={EmployeeForm} />
          <Route exact path="/employees/edit/:empId" component={EmployeeForm} />
          <Route exact path="/history" component={HistoryList} />
          <Route exact path="/history/details/:historyId" component={HistoryDetails} />
          <Route exact path="/history/add" component={HistoryForm} />
          <Route exact path="/history/edit/:historyId" component={HistoryForm} />
          <Route exact path="/trainings/" component={TrainingList} />
          <Route exact path="/trainings/add" component={TrainingForm} />
          <Route exact path="/trainings/edit/:trainingId" component={TrainingForm} />
          <Route exact path="/trainings/details/:trainingId" component={TrainingDetails} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

