'use client';

import { useState } from 'react';
import { Navbar } from '@/components/custom/navbar';
import { MetricsCard } from '@/components/custom/metrics-card';
import { PerformanceChart } from '@/components/custom/performance-chart';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Car, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Trophy,
  Target,
  Award,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { 
  vendedores, 
  metricas, 
  desafios, 
  premiacoes,
  dadosGraficoVendas,
  dadosGraficoScore 
} from '@/lib/mock-data';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Calcular totais
  const totalVendas = metricas.reduce((acc, m) => acc + m.carrosVendidos, 0);
  const totalAgendamentos = metricas.reduce((acc, m) => acc + m.agendamentos, 0);
  const tempoMedioGeral = Math.round(
    metricas.reduce((acc, m) => acc + m.tempoMedioAtendimento, 0) / metricas.length
  );
  const metasAtingidas = metricas.filter(m => m.metaAtingida).length;

  // Ordenar vendedores por ranking
  const vendedoresOrdenados = metricas
    .map(m => ({
      ...vendedores.find(v => v.id === m.vendedorId)!,
      metricas: m,
    }))
    .sort((a, b) => a.metricas.posicaoRanking - b.metricas.posicaoRanking);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Dashboard de Vendas
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Acompanhe o desempenho da equipe em tempo real
              </p>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricsCard
                title="Carros Vendidos"
                value={totalVendas}
                subtitle="Este mês"
                icon={Car}
                color="blue"
                trend={{ value: 12, isPositive: true }}
              />
              <MetricsCard
                title="Agendamentos"
                value={totalAgendamentos}
                subtitle="Total da equipe"
                icon={Calendar}
                color="green"
                trend={{ value: 8, isPositive: true }}
              />
              <MetricsCard
                title="Tempo Médio"
                value={`${tempoMedioGeral}min`}
                subtitle="Atendimento"
                icon={Clock}
                color="orange"
                trend={{ value: 5, isPositive: false }}
              />
              <MetricsCard
                title="Metas Atingidas"
                value={`${metasAtingidas}/${metricas.length}`}
                subtitle="Vendedores"
                icon={Target}
                color="purple"
              />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart
                data={dadosGraficoVendas}
                type="bar"
                title="Vendas vs Meta (Últimos 6 Meses)"
                dataKeys={[
                  { key: 'vendas', color: '#3b82f6', name: 'Vendas' },
                  { key: 'meta', color: '#10b981', name: 'Meta' },
                ]}
              />
              <PerformanceChart
                data={dadosGraficoScore}
                type="line"
                title="Ranking de Score Mensal"
                dataKeys={[
                  { key: 'score', color: '#8b5cf6', name: 'Score' },
                ]}
              />
            </div>

            {/* Ranking da Equipe */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  Ranking da Equipe
                </h3>
                <Badge variant="secondary" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  Dezembro 2024
                </Badge>
              </div>

              <div className="space-y-4">
                {vendedoresOrdenados.map((vendedor, index) => {
                  const posicao = vendedor.metricas.posicaoRanking;
                  const medalha = posicao === 1 ? '🥇' : posicao === 2 ? '🥈' : posicao === 3 ? '🥉' : null;
                  
                  return (
                    <div
                      key={vendedor.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-lg ${
                        posicao <= 3
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
                          : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-2xl font-bold text-slate-400 w-8 text-center">
                          {medalha || `#${posicao}`}
                        </div>
                        <Avatar className="w-12 h-12 border-2 border-white dark:border-slate-600">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                            {vendedor.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              {vendedor.nome}
                            </h4>
                            {vendedor.metricas.metaAtingida && (
                              <Badge variant="secondary" className="bg-emerald-500 text-white text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Meta OK
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {vendedor.cargo}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {vendedor.metricas.carrosVendidos}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Vendas</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {vendedor.metricas.agendamentos}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Agendamentos</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {vendedor.metricas.scoreTotal}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">Score</p>
                        </div>
                      </div>

                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Desafios Ativos */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  Desafios Ativos
                </h3>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {desafios.map((desafio) => (
                  <div
                    key={desafio.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800/50 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="bg-orange-500 text-white">
                        {desafio.periodo}
                      </Badge>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                    
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {desafio.titulo}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {desafio.descricao}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Progresso Médio</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {Math.round(
                            Object.values(desafio.progresso).reduce((a, b) => a + b, 0) /
                            Object.values(desafio.progresso).length
                          )} / {desafio.meta}
                        </span>
                      </div>
                      <Progress 
                        value={
                          (Object.values(desafio.progresso).reduce((a, b) => a + b, 0) /
                          Object.values(desafio.progresso).length / desafio.meta) * 100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        🎁 {desafio.premio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'equipe' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Equipe de Vendas
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Gerencie e acompanhe cada vendedor
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendedoresOrdenados.map((vendedor) => (
                <Card key={vendedor.id} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-white dark:border-slate-600">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold text-lg">
                        {vendedor.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {vendedor.nome}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {vendedor.cargo}
                      </p>
                      <Badge variant="secondary" className="mt-2">
                        #{vendedor.metricas.posicaoRanking} no Ranking
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Email:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{vendedor.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Telefone:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{vendedor.telefone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {vendedor.metricas.carrosVendidos}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Vendas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {vendedor.metricas.scoreTotal}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Score</p>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Ver Detalhes
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'desafios' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Desafios e Metas
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Acompanhe os desafios ativos e crie novos
              </p>
            </div>

            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Target className="w-4 h-4 mr-2" />
              Criar Novo Desafio
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {desafios.map((desafio) => (
                <Card key={desafio.id} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        {desafio.titulo}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {desafio.descricao}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-orange-500 text-white">
                      {desafio.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Período</p>
                        <p className="font-semibold text-slate-900 dark:text-white capitalize">
                          {desafio.periodo}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Meta</p>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {desafio.meta} {desafio.tipo}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                        🎁 Premiação
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {desafio.premio}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                        Progresso Individual
                      </p>
                      <div className="space-y-2">
                        {Object.entries(desafio.progresso).map(([vendedorId, progresso]) => {
                          const vendedor = vendedores.find(v => v.id === vendedorId);
                          const percentual = (progresso / desafio.meta) * 100;
                          
                          return (
                            <div key={vendedorId} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600 dark:text-slate-400">
                                  {vendedor?.nome}
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-white">
                                  {progresso} / {desafio.meta}
                                </span>
                              </div>
                              <Progress value={percentual} className="h-2" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'premiacoes' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Premiações Disponíveis
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Conquiste prêmios incríveis atingindo suas metas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {premiacoes.map((premiacao) => (
                <Card key={premiacao.id} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                        {premiacao.titulo}
                      </h3>
                      <Badge variant="secondary" className="capitalize">
                        {premiacao.tipo}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {premiacao.descricao}
                  </p>

                  {premiacao.valor && (
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 mb-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">Valor</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        R$ {premiacao.valor.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 mb-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Requisitos
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {premiacao.requisitos}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      Vendedores Elegíveis ({premiacao.vendedoresElegiveis.length})
                    </p>
                    <div className="flex -space-x-2">
                      {premiacao.vendedoresElegiveis.slice(0, 5).map((vendedorId) => {
                        const vendedor = vendedores.find(v => v.id === vendedorId);
                        return (
                          <Avatar key={vendedorId} className="w-8 h-8 border-2 border-white dark:border-slate-800">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs">
                              {vendedor?.nome.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })}
                      {premiacao.vendedoresElegiveis.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                          +{premiacao.vendedoresElegiveis.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                CRM - Pipeline de Vendas
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Gerencie seus leads e oportunidades
              </p>
            </div>

            <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Módulo CRM em Desenvolvimento
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  O sistema completo de CRM com Kanban, Timeline, Automações e Chamadas de Vídeo será implementado no próximo módulo.
                </p>
                <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Kanban Board para gestão de leads</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Timeline de interações</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Automações de mensagens</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Upload de arquivos e documentos</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Chamadas de vídeo integradas</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
