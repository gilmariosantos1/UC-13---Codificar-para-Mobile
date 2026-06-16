import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, 
  IonList, IonLabel, IonItem, useIonViewWillEnter, IonIcon, IonItemSliding,
  useIonActionSheet,
  } from '@ionic/react';
import { useState } from 'react';
import { ProdutoService } from '../service/ProdutoService';
import { useHistory } from 'react-router';
import { create, trashOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();

  const [produtos, setProdutos] = useState<any[]>([]);

  //criando uma instância do serviço para manipular os produtos
  const service = new ProdutoService();

  //carregando os produtos ao montar o componente e sempre que a view entrar em foco
  useIonViewWillEnter(() => {
    carregarProdutos();
  });

  async function carregarProdutos() {
    const produtosCarregados = await service.listar();
    setProdutos(produtosCarregados);
  }
  
  async function removerProduto(id: number) {
    await service.remover(id);
    carregarProdutos();
  }
  //navegando para a página de cadastro
  function navegarParaCadastro(){
    history.push('/cadastro');
  }

  const [present] = useIonActionSheet();

  async function deleteProduto(id: number) {
    present({
      header: 'Tem certeza que deseja remover este produto?',
      buttons: [
        { text: 'Sim', role: 'confirm' },
        { text: 'Não', role: 'cancel' },
      ],
      onWillDismiss: (event) => {
        if (event.detail.role === 'confirm') {
          removerProduto(id);
        }
      },
    });
  }
     async function editarProduto(id: number) {
    history.push(`/editar/${id}`);
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
          {produtos.map((produto, index) => {
            const estoque = produto.estoque ?? produto.quantidade ?? 0;
            return (
              <IonItemSliding key={index}>
                <IonItem>                  
                <IonLabel>
                  {produto.nome} - R$ {produto.preco.toFixed(2)} | Estoque: {estoque}               
               </IonLabel>             
               <IonButton color='warning' onClick={() => editarProduto(produto.id)}>                                                
                <IonIcon icon={create}> </IonIcon>   
                </IonButton>                                          
               <IonButton color='danger' onClick={() => deleteProduto(produto.id)}>                                                
                <IonIcon icon={trashOutline}> </IonIcon>                                             
                Remover
               </IonButton>
              </IonItem>              
              </IonItemSliding>
            );            
          })}          
         </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
