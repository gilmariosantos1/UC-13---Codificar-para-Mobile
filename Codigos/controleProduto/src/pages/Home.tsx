import React, {useState, useRef} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import './Home.css';
import { Produto } from '../models/Produto';

const Home: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  function adicionar(){
    const novoProduto = new Produto("Feijão", 5.00);

    setProdutos([...produtos, novoProduto])

    console.log(produtos);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
         <br />
        <IonInput label="Descrição do Produto" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput> 
      
      <br />

        <IonInput label="Preço" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
      <br />

        <IonInput label="Estoque" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
      
      <IonButton onClick={adicionar}> Cadastrar Produto</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
