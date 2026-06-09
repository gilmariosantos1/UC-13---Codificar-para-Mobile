import React, { useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, 
  IonList, IonLabel, IonItem, useIonViewWillEnter, IonIcon, IonItemSliding,
  useIonActionSheet,
  IonModal, 
  } from '@ionic/react';
import { useState } from 'react';
import { ProdutoService } from '../service/ProdutoService';
import { useHistory } from 'react-router';
import { trashOutline } from 'ionicons/icons';

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

  //modal para confirmar a remoção do produto
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function deletarProduto() {    
    modal.current?.dismiss();    
  }
   function canDismiss() {
    return new Promise<boolean>((resolve, reject) => {
      present({
        header: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            role: 'confirm',
          },
          {
            text: 'No',
            role: 'cancel',
          },
        ],
        onWillDismiss: (event) => {
          if (event.detail.role === 'confirm') {
            resolve(true);
          } else {
            reject();
          }
        },
      });
    });
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
               <IonButton color='danger' onClick={() => deletarProduto()}>                                                
                <IonIcon icon={trashOutline}> </IonIcon>                                            
                Remover
               </IonButton>

               <IonModal ref={modal} canDismiss={canDismiss} presentingElement={presentingElement!}>
                <p>Tem certeza que deseja remover este produto?</p>
                <IonButton color='danger' onClick={() => deletarProduto()}>Remover</IonButton>                
               </IonModal>
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
