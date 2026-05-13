import React from 'react';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import "./Home.css";

function Example() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Header</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Content</h1>
        <IonButton>Default</IonButton>
        <IonButton disabled={true}>Disabled</IonButton>
      </IonContent>
    </>
  );
}
export default Example;