import React, {useRef} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import { Produto } from '../models/Produto';
import { useHistory } from 'react-router';
import { useIonAlert } from '@ionic/react';

interface CadastroProps { addProduto: (p: Produto) => void }


const Cadastro: React.FC<CadastroProps> = ({ addProduto }) => {
  const nomeRef = useRef<any>(null);
  const precoRef = useRef<any>(null);
  const estoqueRef = useRef<any>(null);
  const history = useHistory();

  const [presentAlert] = useIonAlert();

  function adicionarProduto(){
    const nome = nomeRef.current?.value || "";
    const preco = parseFloat(precoRef.current?.value || "0");
    const estoque = parseInt(estoqueRef.current?.value || "0");

    if (nome && preco > 0) {
      const novoProduto = new Produto(nome, preco);
      novoProduto.adicionarEstoque(estoque);
      addProduto(novoProduto);

      presentAlert({
        header: 'Sucesso',
        message: 'Produto cadastrado com sucesso!',
        buttons: ['OK']
      });

      if (nomeRef.current) nomeRef.current.value = "";
      if (precoRef.current) precoRef.current.value = "";
      if (estoqueRef.current) estoqueRef.current.value = "";

      //redirecionar para Home
      //history.push('/home');
    } else {
      presentAlert({
        header: 'Erro',
        message: 'Por favor, preencha o nome e o preço corretamente.',
        buttons: ['OK']
      });
    }
  }
  
  function navegarParaHome(){
    history.push('/home');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controle de Estoque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={navegarParaHome}> Voltar para Home</IonButton>
         <br />
        <IonInput ref={nomeRef} label="Descrição do Produto" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput> 
      
      <br />

        <IonInput ref={precoRef} label="Preço" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
      <br />

        <IonInput ref={estoqueRef} label="Estoque" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
      
      <IonButton onClick={adicionarProduto}> Cadastrar Produto</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
