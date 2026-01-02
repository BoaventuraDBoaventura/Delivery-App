
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface TransactionItem {
  name: string;
  quantity: number;
  price: number;
}

interface Transaction {
  id: string;
  method: 'M-Mola' | 'E-Pesa';
  amount: number;
  date: string;
  fullDate: string;
  status: 'completed' | 'pending' | 'failed';
  restaurant: string;
  orderId: string;
  items: TransactionItem[];
}

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'M-Mola' | 'E-Pesa'>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const transactions: Transaction[] = [
    { 
      id: 'TX-9921-001X', 
      method: 'M-Mola', 
      amount: 850.00, 
      date: 'Hoje', 
      fullDate: '15 Out 2023, 14:20', 
      status: 'completed', 
      restaurant: 'Sabor da Vila', 
      orderId: '#4821',
      items: [
        { name: 'Caril de Caranguejo', quantity: 1, price: 850.00 }
      ]
    },
    { 
      id: 'TX-9812-002Y', 
      method: 'E-Pesa', 
      amount: 1200.00, 
      date: 'Ontem', 
      fullDate: '14 Out 2023, 20:15', 
      status: 'completed', 
      restaurant: 'Costa do Sol', 
      orderId: '#4790',
      items: [
        { name: 'Arroz de Marisco', quantity: 1, price: 1200.00 }
      ]
    },
    { 
      id: 'TX-9755-003Z', 
      method: 'M-Mola', 
      amount: 450.00, 
      date: '12 Set', 
      fullDate: '12 Set 2023, 12:05', 
      status: 'failed', 
      restaurant: 'Piri-Piri Grill', 
      orderId: '#4512',
      items: [
        { name: 'Frango Piri-Piri', quantity: 1, price: 450.00 }
      ]
    },
    { 
      id: 'TX-9600-004W', 
      method: 'E-Pesa', 
      amount: 350.00, 
      date: '10 Set', 
      fullDate: '10 Set 2023, 19:30', 
      status: 'completed', 
      restaurant: 'Sabor da Vila', 
      orderId: '#4480',
      items: [
        { name: 'Magumba Grelhada', quantity: 1, price: 350.00 }
      ]
    },
    { 
      id: 'TX-9520-005K', 
      method: 'M-Mola', 
      amount: 1050.00, 
      date: '08 Set', 
      fullDate: '08 Set 2023, 08:45', 
      status: 'completed', 
      restaurant: 'Restaurante Zambi', 
      orderId: '#4410',
      items: [
        { name: 'Filé de Peixe Zambi', quantity: 1, price: 1350.00 },
        { name: 'Água Mineral', quantity: 2, price: 50.00 }
      ]
    },
  ];

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter(tx => tx.method === filter);
  }, [filter]);

  const totalSpent = useMemo(() => {
    return transactions
      .filter(tx => tx.status === 'completed')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const getStatusConfig = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return { icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-50', label: 'Sucesso' };
      case 'pending': return { icon: 'schedule', color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pendente' };
      case 'failed': return { icon: 'cancel', color: 'text-red-500', bg: 'bg-red-50', label: 'Falhou' };
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Comprovativo baixado com sucesso na pasta Downloads!');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center p-4 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex-1 text-center">
          <h1 className="font-black text-gray-900 uppercase tracking-widest text-xs">Finanças</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Histórico de Transações</p>
        </div>
        <button className="size-10 rounded-full flex items-center justify-center text-gray-400">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-10">
        {/* Modern Summary Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-gray-200">
          <div className="absolute -top-12 -right-12 size-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 size-40 bg-secondary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Balanço Mensal (Outubro)</p>
            <div className="flex items-baseline gap-2 mb-6">
              <h2 className="text-4xl font-black tracking-tight">{totalSpent.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}</h2>
              <span className="text-sm font-bold opacity-60 uppercase">MT</span>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/5 px-4 py-2 rounded-2xl">
                <p className="text-[8px] font-black uppercase opacity-60">Concluídas</p>
                <p className="text-sm font-black">04</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/5 px-4 py-2 rounded-2xl">
                <p className="text-[8px] font-black uppercase opacity-60">Falhas</p>
                <p className="text-sm font-black text-red-400">01</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {(['all', 'M-Mola', 'E-Pesa'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-6 h-10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === opt 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white text-gray-400 border border-gray-100 shadow-sm'
              }`}
            >
              {opt === 'all' ? 'Todas' : opt}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Movimentos</h3>
          
          <div className="space-y-3">
            {filteredTransactions.map((tx) => {
              const status = getStatusConfig(tx.status);
              return (
                <div 
                  key={tx.id} 
                  className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-14 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-tighter shadow-inner shrink-0 ${
                      tx.method === 'M-Mola' ? 'bg-orange-500 text-white' : 'bg-[#eec12e] text-black'
                    }`}>
                      {tx.method}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-gray-900 text-sm truncate">{tx.restaurant}</h4>
                        <span className={`font-black text-sm ${tx.status === 'failed' ? 'text-red-500' : 'text-gray-900'}`}>
                          {tx.amount.toFixed(2).replace('.', ',')} MT
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">{tx.orderId} • {tx.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className={`size-6 rounded-full ${status.bg} flex items-center justify-center`}>
                        <span className={`material-symbols-outlined text-[14px] ${status.color}`}>{status.icon}</span>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${status.color}`}>{status.label}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedTx(tx)}
                      className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-1.5 rounded-lg active:scale-95 transition-all"
                    >
                      Ver Comprovativo
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
              <span className="material-symbols-outlined text-4xl">receipt_long</span>
            </div>
            <p className="font-black text-gray-900 text-sm uppercase tracking-widest">Sem movimentos</p>
            <p className="text-xs text-gray-400 mt-1">Não foram encontrados pagamentos nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Modal de Comprovativo Detalhado */}
      {selectedTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200 overflow-y-auto">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSelectedTx(null)} />
          
          <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 my-auto">
            {/* Design de Recibo */}
            <div className="p-8 text-center bg-white border-b-4 border-dotted border-gray-100 relative">
              <div className="flex justify-center items-center gap-1 mb-6">
                <span className="text-xl font-black text-primary tracking-tighter">moz</span>
                <span className="text-xl font-black text-secondary tracking-tighter">delivery</span>
              </div>
              
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Comprovativo de Pagamento</h2>
              <div className="bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-8">
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">{selectedTx.restaurant}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Valor Total Pago</p>
                  <p className="text-4xl font-black text-gray-900 leading-none">{selectedTx.amount.toFixed(2).replace('.', ',')} <span className="text-lg">MT</span></p>
                </div>
                
                {/* Listagem de Itens no Recibo */}
                <div className="py-6 border-y border-gray-50 text-left">
                  <p className="text-[8px] font-black uppercase text-gray-300 tracking-widest mb-4">Itens do Pedido {selectedTx.orderId}</p>
                  <div className="space-y-3">
                    {selectedTx.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start font-mono">
                        <div className="flex-1 pr-4">
                          <p className="text-[11px] font-bold text-gray-700 leading-tight">
                            <span className="text-gray-400">{item.quantity}x</span> {item.name}
                          </p>
                        </div>
                        <p className="text-[11px] font-bold text-gray-900 shrink-0">{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    {/* Taxa de Entrega Simulada */}
                    <div className="flex justify-between items-center font-mono pt-2 border-t border-gray-50 border-dashed">
                      <p className="text-[11px] font-bold text-gray-400">Entrega</p>
                      <p className="text-[11px] font-bold text-green-500">GRÁTIS</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[10px]">
                  <div className="text-left">
                    <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">ID Transação</p>
                    <p className="font-bold text-gray-900 font-mono mt-0.5 truncate">{selectedTx.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Via de Pagamento</p>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedTx.method}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Data</p>
                    <p className="font-bold text-gray-900 mt-0.5">{selectedTx.fullDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Status</p>
                    <p className="font-bold text-green-600 mt-0.5">Liquidado</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 pt-4">
                   <div className="size-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                      <span className="material-symbols-outlined text-3xl text-gray-200">qr_code_2</span>
                   </div>
                   <p className="text-[7px] text-gray-300 font-bold uppercase tracking-widest">moz-delivery-auth-v2</p>
                </div>
              </div>
            </div>

            {/* Ações do Modal */}
            <div className="p-6 bg-gray-50/80 backdrop-blur-md space-y-3">
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full h-14 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                {isDownloading ? (
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">download</span>
                    Baixar Recibo PDF
                  </>
                )}
              </button>
              
              <div className="flex gap-3">
                <button className="flex-1 h-12 bg-white text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest border border-gray-200 flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-lg">share</span>
                  Partilhar
                </button>
                <button 
                  onClick={() => setSelectedTx(null)}
                  className="flex-1 h-12 bg-gray-200 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
