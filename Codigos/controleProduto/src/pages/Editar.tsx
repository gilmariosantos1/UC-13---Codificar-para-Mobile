import React, { useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, useIonViewWillEnter } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useIonAlert } from '@ionic/react';
import { ProdutoService } from '../service/ProdutoService';

const Editar: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<any>(null);
  
  const service = new ProdutoService();

    useIonViewWillEnter(() => {
      carregarProduto();
    });

   async function carregarProduto() {
    if (!id) return;
    const produtos = await service.listar();
    const produtoEncontrado = produtos.find((p: any) => p.id === parseInt(id));
    setProduto(produtoEncontrado || null);
  }
    async function editar() {
    if (!produto) return;
    await service.atualizar(produto.id, produto);
    presentAlert({
      header: 'Sucesso',
      message: 'Produto atualizado com sucesso!',
      buttons: ['OK'] 
    });
    history.push('/home');
  }

  const [presentAlert] = useIonAlert();

  function navegarParaHome(){
    history.push('/home');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Produto</IonTitle>
        </IonToolbar>
      </IonHeader>

      {produto ? (
        <IonContent fullscreen>
          <IonButton onClick={navegarParaHome}> Voltar para Home</IonButton>
          <br />
          <IonInput value={produto.nome} label="Descrição do Produto" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
          <br />
          <IonInput value={produto.preco} label="Preço" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
          <br />
          <IonInput value={produto.estoque ?? produto.quantidade ?? 0} label="Estoque" labelPlacement="floating" fill="outline" placeholder="Digite aqui"></IonInput>
          <IonButton onClick={editar}> Salvar Alterações</IonButton>
        </IonContent>
      ) : (
        <IonContent fullscreen>
          <p>Carregando produto...</p>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Editar;
