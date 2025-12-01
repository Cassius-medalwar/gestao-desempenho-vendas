// Tipos para o sistema de gestão de vendas automotivas

export interface Vendedor {
  id: string;
  nome: string;
  avatar?: string;
  email: string;
  telefone: string;
  cargo: string;
  dataAdmissao: string;
}

export interface MetricasVendedor {
  vendedorId: string;
  carrosVendidos: number;
  agendamentos: number;
  tempoMedioAtendimento: number; // em minutos
  scoreTotal: number;
  scoreSemanal: number;
  scoreMensal: number;
  scoreAnual: number;
  metaAtingida: boolean;
  posicaoRanking: number;
}

export interface Venda {
  id: string;
  vendedorId: string;
  clienteId: string;
  veiculoId: string;
  valor: number;
  data: string;
  status: 'concluida' | 'pendente' | 'cancelada';
  comissao: number;
}

export interface Agendamento {
  id: string;
  vendedorId: string;
  clienteId: string;
  data: string;
  horario: string;
  tipo: 'test-drive' | 'visita' | 'negociacao' | 'entrega';
  status: 'agendado' | 'concluido' | 'cancelado' | 'remarcado';
  duracao: number; // em minutos
  gravacaoAudio?: string;
  gravacaoVideo?: string;
  observacoes?: string;
}

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'vendas' | 'agendamentos' | 'atendimento';
  meta: number;
  periodo: 'semanal' | 'mensal' | 'trimestral' | 'anual';
  dataInicio: string;
  dataFim: string;
  premio: string;
  valorPremio?: number;
  status: 'ativo' | 'concluido' | 'expirado';
  participantes: string[]; // IDs dos vendedores
  progresso: { [vendedorId: string]: number };
}

export interface Premiacao {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'bonus' | 'viagem' | 'produto' | 'reconhecimento';
  valor?: number;
  imagem?: string;
  requisitos: string;
  vendedoresElegiveis: string[];
  dataExpiracao?: string;
}

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem: string;
  status: 'novo' | 'contato' | 'qualificado' | 'proposta' | 'negociacao' | 'ganho' | 'perdido';
  vendedorResponsavel?: string;
  veiculoInteresse?: string;
  valor?: number;
  probabilidade: number;
  dataCriacao: string;
  dataUltimaInteracao: string;
  proximaAcao?: string;
  dataProximaAcao?: string;
  observacoes?: string;
  arquivos: Arquivo[];
  historico: InteracaoLead[];
}

export interface InteracaoLead {
  id: string;
  leadId: string;
  tipo: 'email' | 'telefone' | 'whatsapp' | 'reuniao' | 'visita' | 'nota';
  descricao: string;
  data: string;
  vendedorId: string;
  duracao?: number;
  resultado?: string;
}

export interface Arquivo {
  id: string;
  nome: string;
  tipo: 'foto' | 'video' | 'documento';
  url: string;
  tamanho: number;
  dataUpload: string;
  uploadPor: string;
}

export interface Automacao {
  id: string;
  nome: string;
  tipo: 'email' | 'sms' | 'whatsapp' | 'notificacao';
  gatilho: string;
  condicoes: any;
  acoes: any;
  ativa: boolean;
  ultimaExecucao?: string;
}

export interface Notificacao {
  id: string;
  tipo: 'info' | 'sucesso' | 'alerta' | 'erro';
  titulo: string;
  mensagem: string;
  data: string;
  lida: boolean;
  link?: string;
}
