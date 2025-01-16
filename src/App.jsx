import React from 'react';
import { EnrollProvider } from "./enrollContext";
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";


export default function App() {
  return (
    <EnrollProvider>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrollProvider>
  );
}