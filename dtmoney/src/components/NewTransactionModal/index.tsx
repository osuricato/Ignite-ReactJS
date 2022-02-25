import { FormEvent, useState } from 'react'; // Arquivos JS
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg'       // Arquivos de imagem
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles'; // Arquivo de estilo

Modal.setAppElement('#root')

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category, 
      type
    })

    onRequestClose()

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay-modal"
      className="react-modal-content"
    >
      <button type="button" className="react-modal-close" onClick={onRequestClose}>
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            // className={type === 'deposit' ? 'active' : ''}
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}