import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonNavLink, IonList, IonLabel, IonItem } from '@ionic/react';
import './Home.css';
import { Produto } from '../models/Produto';
import { useHistory } from 'react-router';

interface HomeProps { produtos: Produto[] }

const Home: React.FC<HomeProps> = ({ produtos }) => {
  const history = useHistory();

  function navegarParaCadastro(){
    history.push('/cadastro');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <h2>Bem-vindo ao Controle de Estoque</h2>

        <IonButton onClick={navegarParaCadastro}> Cadastrar Produto</IonButton>
         
         <IonList>
          {produtos.map((produto, index) => (
            <IonItem key={index}>
              <IonLabel>
                {produto.nome} - R$ {produto.preco.toFixed(2)} | Estoque: {produto.estoque}
              </IonLabel>
              
              </IonItem>
              
          ))}

         </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
