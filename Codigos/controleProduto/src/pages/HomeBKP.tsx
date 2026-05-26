import React, {useState, useRef} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import './Home.css';
import { Produto } from '../models/Produto';

const Home: React.FC = () => {
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);

  function adicionar(){
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0) {
      const novoProduto = new Produto(nome, preco);
      novoProduto.adicionarEstoque(estoque);
      
      setProdutos([...produtos, novoProduto]);
      
      console.log("Produto adicionado:", novoProduto);

      
      if (nomeRef.current) nomeRef.current.value = "";
      if (precoRef.current) precoRef.current.value = "";
      if (estoqueRef.current) estoqueRef.current.value = "";
    }
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
        <IonInput ref={nomeRef} label="Descrição do Produto" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput> 
      
      <br />

        <IonInput ref={precoRef} label="Preço" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
      <br />

        <IonInput ref={estoqueRef} label="Estoque" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
      
      <IonButton onClick={adicionar}> Cadastrar Produto</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
