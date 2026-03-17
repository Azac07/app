import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, User, TrendingUp, ShieldCheck, } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
const portfolioQuestionChartData = [
    { year: 'Año 1', A: 3.0, B: 6.0, C: 15.0, D: 21.0, E: 27.0 },
    { year: 'Año 2', A: 3.0, B: -2.0, C: -5.0, D: -9.0, E: -12.0 },
    { year: 'Año 3', A: 3.0, B: 5.0, C: -3.0, D: -5.0, E: -10.0 },
    { year: 'Año 4', A: 3.0, B: 6.0, C: 10.0, D: 17.0, E: 30.0 },
    { year: 'Año 5', A: 3.0, B: 4.5, C: 9.0, D: 9.0, E: 7.0 },
];
const portfolioDescriptions = {
    'Portfolio A': 'Año 1: 3.0% · Año 2: 3.0% · Año 3: 3.0% · Año 4: 3.0% · Año 5: 3.0%',
    'Portfolio B': 'Año 1: 6.0% · Año 2: -2.0% · Año 3: 5.0% · Año 4: 6.0% · Año 5: 4.5%',
    'Portfolio C': 'Año 1: 15.0% · Año 2: -5.0% · Año 3: -3.0% · Año 4: 10.0% · Año 5: 9.0%',
    'Portfolio D': 'Año 1: 21.0% · Año 2: -9.0% · Año 3: -5.0% · Año 4: 17.0% · Año 5: 9.0%',
    'Portfolio E': 'Año 1: 27.0% · Año 2: -12.0% · Año 3: -10.0% · Año 4: 30.0% · Año 5: 7.0%',
};
const profileData = {
    conservador: {
        objetivo: 'Preservación de capital',
        retornoPromedio: 6.0,
        mejorEscenario: 7.0,
        maxRiesgoAnual: 2.0,
        horizonte: '1-3 años',
        acciones: '0%',
        bonos: '90%',
        efectivo: '10%',
        subclases: [
            ['Bonos Corporativos USA', '40%'],
            ['Bonos del Tesoro', '30%'],
            ['Certificado Depósito', '15%'],
            ['Bonos Municipales', '5%'],
            ['Money Market', '10%'],
        ],
    },
    equilibrado: {
        objetivo: 'Apreciación de capital',
        retornoPromedio: 14.0,
        mejorEscenario: 22.9,
        maxRiesgoAnual: 12.0,
        horizonte: '3-5 años',
        acciones: '60%',
        bonos: '35%',
        efectivo: '5%',
        subclases: [
            ['Mega Cap +200BLN', '30%'],
            ['Large Cap +10BLN', '15%'],
            ['ETFs', '15%'],
            ['Bonos Americanos', '20%'],
            ['Bonos del Tesoro', '15%'],
            ['Money Market', '5%'],
        ],
    },
    agresivo: {
        objetivo: 'Apreciación de capital',
        retornoPromedio: 18.0,
        mejorEscenario: 31.0,
        maxRiesgoAnual: 25.0,
        horizonte: '3-5 años',
        acciones: '90%',
        bonos: '5%',
        efectivo: '5%',
        subclases: [
            ['Mega Cap +200BLN', '30%'],
            ['Large Cap +10BLN', '25%'],
            ['ETFs', '20%'],
            ['Mid Cap', '15%'],
            ['Bonos Americanos', '5%'],
            ['Money Market', '5%'],
        ],
    },
};
const surveyConfig = {
    brand: 'Guardian Brothers Wealth Management',
    subtitle: '',
    profiles: [
        {
            key: 'muy-conservador',
            label: 'Muy conservador',
            min: 10,
            max: 11,
            projectionLabel: 'Muy limitada para bolsa',
            description: 'Este perfil prioriza fuertemente la seguridad y la preservación del capital. La volatilidad natural del mercado podría no alinearse con su nivel de comodidad actual.',
            recommendation: 'Por ahora, la bolsa probablemente no es lo suyo. Lo ideal sería evaluar primero alternativas mucho más defensivas y una estrategia de entrada gradual.',
        },
        {
            key: 'conservador',
            label: 'Conservador',
            min: 12,
            max: 23,
            projectionLabel: '8% - 12% anual',
            description: 'Busca estabilidad, menor volatilidad y preservar el capital por encima de maximizar retornos.',
            recommendation: 'Una cartera enfocada en instrumentos más estables y una exposición moderada al crecimiento.',
        },
        {
            key: 'equilibrado',
            label: 'Equilibrado',
            min: 24,
            max: 35,
            projectionLabel: '13% - 18% anual',
            description: 'Busca balance entre crecimiento y seguridad, aceptando fluctuaciones moderadas a cambio de mejores retornos.',
            recommendation: 'Una cartera diversificada con balance entre crecimiento, estabilidad y oportunidades de largo plazo.',
        },
        {
            key: 'agresivo',
            label: 'Agresivo',
            min: 36,
            max: 46,
            projectionLabel: '19% - 25% anual',
            description: 'Prioriza el crecimiento del capital y tolera variaciones importantes en el corto plazo.',
            recommendation: 'Una cartera orientada al crecimiento con mayor exposición a activos de mayor volatilidad.',
        },
    ],
    questions: [
        {
            id: 'q1',
            title: '1. ¿Qué respuesta describe mejor su conocimiento de inversión?',
            options: [
                { label: 'Novato', score: 1 },
                { label: 'Principiante', score: 2 },
                { label: 'Bueno', score: 3 },
                { label: 'Muy Bueno', score: 4 },
                { label: 'Profesional', score: 5 },
            ],
        },
        {
            id: 'q2',
            title: '2. ¿Cuándo necesitará acceder a esta cartera de inversiones, ya sea por medio de retiros regulares o una gran suma global?',
            options: [
                { label: 'Menos de un año', score: 1 },
                { label: '1 - 5 años', score: 1 },
                { label: '5 - 10 años', score: 1 },
                { label: '10 años o más', score: 1 },
            ],
        },
        {
            id: 'q3',
            title: '3. Elija la declaración que mejor describa el propósito principal de esta cartera.',
            options: [
                { label: 'Seguridad', score: 2 },
                { label: 'Protección contra la inflación', score: 4 },
                { label: 'Crecimiento y seguridad', score: 5 },
                { label: 'Crecimiento', score: 6 },
                { label: 'Crecimiento máximo', score: 7 },
            ],
        },
        {
            id: 'q4',
            title: '4. ¿Cuál es su ingreso mensual?',
            options: [
                { label: 'Menos de $1,000', score: 1 },
                { label: '$1,000 a $5,000', score: 2 },
                { label: '$5,000 a $10,000', score: 3 },
                { label: '$10,000 a $15,000', score: 4 },
                { label: 'Más de $15,000', score: 5 },
            ],
        },
        {
            id: 'q5',
            title: '5. ¿Qué opción describe mejor su situación financiera personal o familiar?',
            options: [
                { label: 'Actualmente no puedo cumplir con todas mis obligaciones financieras sin aumentar mi deuda.', score: 1 },
                { label: 'Puedo cumplir con todas mis obligaciones financieras, pero tengo poco o ningún ahorro.', score: 2 },
                { label: 'Puedo cumplir con todas mis obligaciones financieras y puedo ahorrar menos del 10% de mis ingresos.', score: 3 },
                { label: 'Puedo cumplir con todas mis obligaciones financieras y puedo ahorrar un 10% o más de mis ingresos.', score: 4 },
                { label: 'Tengo pocas obligaciones financieras y una gran cantidad de ahorros.', score: 5 },
            ],
        },
        {
            id: 'q6',
            title: '6. Si fuera propietario de una inversión que cayó 2% en un periodo de un año, ¿qué haría?',
            options: [
                { label: 'Vendería mi inversión a pesar de que conduciría a una pérdida inmediata.', score: 1 },
                { label: 'Esperaría hasta que vuelva a su valor original y luego la movería a algo menos volátil.', score: 2 },
                { label: 'Esperaría porque las fluctuaciones del mercado son normales.', score: 4 },
                { label: 'Compraría más de esta acción porque está a buen precio y voy a largo plazo.', score: 5 },
                { label: 'Aprovecharía la caída para aumentar significativamente mi posición buscando mayor rendimiento futuro.', score: 6 },
            ],
        },
        {
            id: 'q7',
            title: '7. Si tuviera $20,000 para invertir, ¿con qué opción se sentiría más cómodo?',
            options: [
                { label: 'Mínimo $20,000 - Máximo $20,600', score: 1 },
                { label: 'Mínimo $19,000 - Máximo $21,600', score: 2 },
                { label: 'Mínimo $18,000 - Máximo $23,000', score: 3 },
                { label: 'Mínimo $17,000 - Máximo $24,000', score: 4 },
                { label: 'Mínimo $15,000 - Máximo $26,000', score: 5 },
            ],
        },
        {
            id: 'q8',
            title: '8. ¿Con cuál de las siguientes cinco carteras hipotéticas te sentirías más cómodo?',
            showChart: true,
            options: [
                { label: 'Portfolio A', score: 1 },
                { label: 'Portfolio B', score: 2 },
                { label: 'Portfolio C', score: 3 },
                { label: 'Portfolio D', score: 4 },
                { label: 'Portfolio E', score: 5 },
            ],
        },
        {
            id: 'q9',
            title: '9. Dadas las fluctuaciones de cualquier cartera, ¿cuánto tiempo estaría dispuesto a esperar a que sus inversiones recuperen cualquier valor perdido?',
            options: [
                { label: 'Menos de tres meses', score: 1 },
                { label: 'Tres a seis meses', score: 2 },
                { label: 'Seis meses a un año', score: 3 },
                { label: 'Un año a dos', score: 4 },
                { label: 'Dos a tres años', score: 5 },
            ],
        },
        { id: 'amount', title: '¿Cuánto va a invertir?', type: 'currency', placeholder: 'Ej. 100000' },
    ],
};
function getProfile(total) {
    return surveyConfig.profiles.find((profile) => total >= profile.min && total <= profile.max) ?? surveyConfig.profiles[2];
}
function getProfileSummaryText(profileKey) {
    switch (profileKey) {
        case 'muy-conservador':
            return 'El perfil muy conservador prioriza la preservación del capital y busca evitar volatilidad. Recomendamos instrumentos de bajo riesgo y plazos cortos.';
        case 'conservador':
            return 'El perfil conservador busca seguridad con rendimientos moderados. Ideal para personas que desean estabilidad con algo de crecimiento.';
        case 'equilibrado':
            return 'El perfil equilibrado busca un balance entre crecimiento y protección. Acepta fluctuaciones moderadas para retornos más sólidos en el largo plazo.';
        case 'agresivo':
            return 'El perfil agresivo prioriza el crecimiento y está dispuesto a asumir volatilidad. Recomendado para objetivos de largo plazo y alta tolerancia a riesgo.';
        default:
            return '';
    }
}
function formatCurrency(value) {
    const amount = Number(value || 0);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}
function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}
function sanitizeDigits(value) {
    return value.replace(/\D/g, '');
}
function projectCompound(amount, annualRate, years) {
    return amount * Math.pow(1 + annualRate / 100, years);
}
function projectWorstCase(amount, annualRisk, years) {
    return amount * Math.pow(Math.max(0, 1 - annualRisk / 100), years);
}
function buildProjectionChart(amount, profileKey) {
    const config = profileData[profileKey];
    return Array.from({ length: 6 }, (_, year) => ({
        year: `Año ${year}`,
        Promedio: year === 0 ? amount : projectCompound(amount, config.retornoPromedio, year),
        Mejor: year === 0 ? amount : projectCompound(amount, config.mejorEscenario, year),
        Peor: year === 0 ? amount : projectWorstCase(amount, config.maxRiesgoAnual, year),
    }));
}
function calculateProjection(amount, profileKey) {
    const numericAmount = Number(amount || 0);
    if (!numericAmount || profileKey === 'muy-conservador')
        return null;
    const safeProfileKey = profileKey;
    const config = profileData[safeProfileKey];
    const chart = buildProjectionChart(numericAmount, safeProfileKey);
    return {
        invested: numericAmount,
        year3Average: projectCompound(numericAmount, config.retornoPromedio, 3),
        year5Average: projectCompound(numericAmount, config.retornoPromedio, 5),
        year3Best: projectCompound(numericAmount, config.mejorEscenario, 3),
        year5Best: projectCompound(numericAmount, config.mejorEscenario, 5),
        year5Worst: projectWorstCase(numericAmount, config.maxRiesgoAnual, 5),
        chart,
    };
}
function BrandHeader() {
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Open Sans, sans-serif' }, children: [_jsx("div", { style: { width: 40, height: 40, borderRadius: 10, background: '#0b1f44', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, fontFamily: 'Lora, serif' }, children: "GB" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: 700, color: '#0b1f44', fontSize: 18, fontFamily: 'Lora, serif' }, children: "Guardian Brothers" }), _jsx("div", { style: { fontSize: 12, color: '#6b7280' }, children: "Wealth Management" })] })] }));
}
function ProfileBadge({ label }) {
    return _jsx("span", { style: { background: '#f59e0b', color: '#0b1f44', padding: '4px 10px', borderRadius: 999, fontWeight: 600 }, children: label });
}
function App() {
    const [clientName, setClientName] = useState('');
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [investmentAmount, setInvestmentAmount] = useState('');
    const totalQuestions = surveyConfig.questions.length;
    const isIntro = step === 0;
    const isResult = step === totalQuestions + 1;
    const currentQuestion = surveyConfig.questions[step - 1];
    const totalScore = useMemo(() => Object.values(answers).reduce((sum, value) => sum + (value?.score || 0), 0), [answers]);
    const profile = useMemo(() => getProfile(totalScore), [totalScore]);
    const allocation = profile.key === 'muy-conservador' ? null : profileData[profile.key];
    const projection = useMemo(() => calculateProjection(investmentAmount, profile.key), [investmentAmount, profile.key]);
    const progress = useMemo(() => {
        if (isIntro)
            return 0;
        if (isResult)
            return 100;
        return Math.round(((step - 1) / totalQuestions) * 100);
    }, [isIntro, isResult, step, totalQuestions]);
    const canContinueFromIntro = clientName.trim().length > 0;
    const hasSelectedCurrent = currentQuestion
        ? currentQuestion.type === 'currency'
            ? investmentAmount.trim().length > 0
            : Boolean(answers[currentQuestion.id])
        : false;
    const handleSelect = (questionId, option) => setAnswers((prev) => ({ ...prev, [questionId]: option }));
    const adjustInvestment = (delta) => {
        const current = Number(investmentAmount || 0);
        const next = Math.max(0, Math.round(current + delta));
        setInvestmentAmount(next.toString());
    };
    const nextStep = () => {
        if (isIntro) {
            if (!canContinueFromIntro)
                return;
            setStep(1);
            return;
        }
        if (!isResult && step <= totalQuestions && hasSelectedCurrent) {
            setStep((prev) => (prev === totalQuestions ? totalQuestions + 1 : prev + 1));
        }
    };
    const prevStep = () => {
        if (isResult) {
            setStep(totalQuestions);
            return;
        }
        setStep((prev) => Math.max(0, prev - 1));
    };
    const resetAll = () => {
        setClientName('');
        setAnswers({});
        setInvestmentAmount('');
        setStep(0);
    };
    const printReport = () => {
        window.print();
    };
    return (_jsx("div", { style: { minHeight: '100vh', background: '#f8fafc', padding: 16, fontFamily: 'Open Sans, sans-serif' }, children: _jsx("div", { style: { maxWidth: 1100, margin: '0 auto' }, children: _jsxs("div", { style: { background: 'white', borderRadius: 24, boxShadow: '0 4px 30px rgba(0,0,0,0.08)', overflow: 'hidden' }, children: [_jsxs("div", { style: { padding: 20, borderBottom: '1px solid #e2e8f0' }, children: [_jsx(BrandHeader, {}), _jsx("h1", { style: { margin: '12px 0 4px', fontSize: 28, fontFamily: 'Lora, serif' }, children: "Perfil de Inversionista" }), _jsx("p", { style: { color: '#475569' }, children: surveyConfig.subtitle }), _jsx("div", { style: { height: 8, width: '100%', background: '#e2e8f0', borderRadius: 999, marginTop: 12 }, children: _jsx("div", { style: { width: `${progress}%`, height: '100%', background: '#0f172a', borderRadius: 999 } }) })] }), _jsxs("div", { style: { padding: 20 }, children: [isIntro && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, children: _jsxs("div", { style: { background: '#e2e8f0', borderRadius: 14, padding: 18 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }, children: [_jsx(User, { size: 18 }), _jsx("strong", { children: "Datos del cliente" })] }), _jsx("label", { style: { display: 'block', marginBottom: 6 }, children: "Nombre del cliente" }), _jsx("input", { value: clientName, onChange: (e) => setClientName(e.target.value), placeholder: "Ej. Juan P\u00E9rez", style: { width: '100%', padding: 10, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 16 } })] }) })), !isIntro && !isResult && currentQuestion && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, children: [_jsxs("div", { style: { marginBottom: 16 }, children: [_jsxs("span", { style: { color: '#64748b', fontSize: 13 }, children: ["Pregunta ", step, " de ", totalQuestions] }), _jsx("h2", { style: { marginTop: 8, fontSize: 22, fontFamily: 'Lora, serif' }, children: currentQuestion.title })] }), currentQuestion.type === 'currency' ? (_jsxs("div", { style: { background: '#f1f5f9', borderRadius: 14, padding: 14 }, children: [_jsx("label", { style: { fontWeight: 600 }, children: "Monto estimado en USD" }), _jsxs("div", { style: { display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }, children: [_jsx("button", { type: "button", onClick: () => adjustInvestment(100000), style: { border: '1px solid #0b1f44', borderRadius: 8, background: '#eab308', color: '#0b1f44', fontWeight: 700, padding: '6px 10px' }, children: "+100,000" }), _jsx("button", { type: "button", onClick: () => adjustInvestment(10000), style: { border: '1px solid #0b1f44', borderRadius: 8, background: '#0b1f44', color: '#eab308', fontWeight: 700, padding: '6px 10px' }, children: "+10,000" }), _jsx("button", { type: "button", onClick: () => adjustInvestment(5000), style: { border: '1px solid #0b1f44', borderRadius: 8, background: '#eab308', color: '#0b1f44', fontWeight: 700, padding: '6px 10px' }, children: "+5,000" }), _jsx("button", { type: "button", onClick: () => adjustInvestment(-5000), style: { border: '1px solid #0b1f44', borderRadius: 8, background: '#1f2937', color: '#eab308', fontWeight: 700, padding: '6px 10px' }, children: "-5,000" }), _jsx("button", { type: "button", onClick: () => adjustInvestment(-10000), style: { border: '1px solid #0b1f44', borderRadius: 8, background: '#eab308', color: '#0b1f44', fontWeight: 700, padding: '6px 10px' }, children: "-10,000" }), _jsx("button", { type: "button", onClick: () => adjustInvestment(-100000), style: { border: '1px solid #0b1f44', borderRadius: 8, background: '#0b1f44', color: '#eab308', fontWeight: 700, padding: '6px 10px' }, children: "-100,000" })] }), _jsx("input", { value: investmentAmount, onChange: (e) => setInvestmentAmount(sanitizeDigits(e.target.value)), placeholder: currentQuestion.placeholder, style: { width: '100%', marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid #cbd5e1' } }), _jsxs("div", { style: { marginTop: 8, color: '#475569' }, children: ["Monto capturado: ", _jsx("strong", { children: investmentAmount ? formatCurrency(investmentAmount) : '$0' })] })] })) : (_jsxs(_Fragment, { children: [currentQuestion.showChart && (_jsxs("div", { style: { marginBottom: 14 }, children: [_jsx("div", { style: { marginBottom: 8 }, children: _jsx("strong", { children: "Comparativo de portfolios" }) }), _jsx("div", { style: { width: '100%', height: 260, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: portfolioQuestionChartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "year" }), _jsx(YAxis, { unit: "%" }), _jsx(Tooltip, { formatter: (value) => [`${value}%`, 'Retorno'] }), _jsx(Legend, { layout: "horizontal", align: "left", verticalAlign: "bottom", wrapperStyle: { left: 0, bottom: -10 } }), _jsx(Line, { type: "monotone", dataKey: "A", name: "Portfolio A", stroke: "#1e3a8a", dot: false }), _jsx(Line, { type: "monotone", dataKey: "B", name: "Portfolio B", stroke: "#2563eb", dot: false }), _jsx(Line, { type: "monotone", dataKey: "C", name: "Portfolio C", stroke: "#0f766e", dot: false }), _jsx(Line, { type: "monotone", dataKey: "D", name: "Portfolio D", stroke: "#ca8a04", dot: false }), _jsx(Line, { type: "monotone", dataKey: "E", name: "Portfolio E", stroke: "#b91c1c", dot: false })] }) }) }), _jsx("div", { style: { display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', marginTop: 10 }, children: Object.entries(portfolioDescriptions).map(([key, value]) => (_jsxs("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 10 }, children: [_jsx("strong", { children: key }), _jsx("p", { style: { margin: '4px 0 0', fontSize: 12, color: '#475569' }, children: value })] }, key))) })] })), _jsx("div", { style: { display: 'grid', gap: 10 }, children: currentQuestion.options?.map((option) => {
                                                    const selected = answers[currentQuestion.id]?.label === option.label;
                                                    return (_jsx("button", { onClick: () => handleSelect(currentQuestion.id, option), style: {
                                                            borderRadius: 12,
                                                            border: selected ? '2px solid #1d4ed8' : '1px solid #cbd5e1',
                                                            background: selected ? '#1d4ed8' : '#fff',
                                                            color: selected ? 'white' : '#0f172a',
                                                            padding: 12,
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                        }, children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: 6 }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: 14 }, children: option.label }), currentQuestion.id === 'q8' && portfolioDescriptions[option.label] && (_jsx("div", { style: { marginTop: 4, fontSize: 12, color: selected ? '#e2e8f0' : '#64748b' }, children: portfolioDescriptions[option.label] }))] }), selected && _jsx("span", { style: { fontWeight: 700 }, children: "\u2713" })] }) }, option.label));
                                                }) })] }))] }, currentQuestion.id)), isResult && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, children: [_jsxs("div", { style: { background: '#0f172a', color: 'white', borderRadius: 14, padding: 16 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsx(CheckCircle2, { size: 20 }), " ", _jsxs("h2", { style: { margin: 0, fontFamily: 'Lora, serif' }, children: ["Perfil ", profile.label] })] }), _jsx("button", { onClick: printReport, style: { border: 'none', borderRadius: 10, background: '#f59e0b', color: '#0f172a', fontWeight: 700, padding: '8px 12px', cursor: 'pointer' }, children: "Imprimir / PDF" })] }), _jsxs("p", { style: { marginTop: 10 }, children: ["\u00A1Felicidades! Gracias por ayudarnos a completar tu perfil. Tu perfil es ", _jsx("strong", { children: profile.label }), "."] })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginTop: 14 }, children: [_jsx("div", { style: { pageBreakAfter: 'always' }, children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }, children: [_jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 12, padding: 12 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 8 }, children: [_jsxs("strong", { children: ["Perfil ", clientName || 'Cliente'] }), _jsx(ProfileBadge, { label: profile.label })] }), _jsx("div", { style: { marginTop: 8 }, children: _jsx("strong", { children: "Proyecci\u00F3n estimada" }) }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 10, padding: 8, marginTop: 6 }, children: [_jsx("strong", { children: "Rango:" }), " ", profile.projectionLabel] }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 10, padding: 8, marginTop: 6 }, children: [_jsx("strong", { children: "Estrategia:" }), " ", profile.recommendation] })] }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 12, padding: 12 }, children: [_jsx("h3", { style: { margin: 0, fontFamily: 'Lora, serif', color: '#0b1f44' }, children: "Resumen" }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsx("div", { style: { color: '#0b1f44', fontWeight: 600 }, children: "Perfil detectado" }), _jsx("div", { style: { color: '#0b1f44' }, children: profile.label })] }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsx("div", { style: { color: '#0b1f44', fontWeight: 600 }, children: "Descripci\u00F3n" }), _jsx("div", { style: { color: '#0b1f44' }, children: getProfileSummaryText(profile.key) })] }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsx("div", { style: { color: '#0b1f44', fontWeight: 600 }, children: "Estrategia de inversi\u00F3n" }), _jsx("div", { style: { color: '#0b1f44' }, children: profile.recommendation })] })] })] }) }), _jsxs("div", { style: { pageBreakBefore: 'always', marginTop: 20 }, children: [_jsx("div", { style: { marginBottom: 8 }, children: _jsx(BrandHeader, {}) }), _jsx("div", { style: { marginBottom: 8 }, children: _jsx("h2", { style: { margin: 0, fontFamily: 'Lora, serif', fontSize: 24, color: '#0f172a' }, children: "Perfil de inversionista" }) }), _jsx("div", { style: { height: 2, width: 130, background: '#0b1f44', marginBottom: 12 } }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 10 }, children: [_jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 10, padding: 10 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, color: '#0b1f44' }, children: [_jsx(TrendingUp, { size: 16 }), _jsx("strong", { children: "Proyecci\u00F3n esperada a 5 a\u00F1os" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8 }, children: [_jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 8, padding: 8 }, children: [_jsx("div", { style: { fontSize: 12, color: '#64748b' }, children: "Escenario promedio" }), _jsx("div", { style: { fontWeight: '700', color: '#0b1f44' }, children: projection ? formatCurrency(projection.year5Average) : '-' })] }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 8, padding: 8 }, children: [_jsx("div", { style: { fontSize: 12, color: '#64748b' }, children: "Mejor escenario" }), _jsx("div", { style: { fontWeight: '700', color: '#059669' }, children: projection ? formatCurrency(projection.year5Best) : '-' })] }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 8, padding: 8 }, children: [_jsx("div", { style: { fontSize: 12, color: '#64748b' }, children: "Peor escenario" }), _jsx("div", { style: { fontWeight: '700', color: '#dc2626' }, children: projection ? formatCurrency(projection.year5Worst) : '-' })] })] }), projection && (_jsxs(_Fragment, { children: [_jsx("div", { style: { width: '100%', height: 240, marginTop: 8, background: '#fff', borderRadius: 8, border: '2px solid #0b1f44', padding: 8 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: projection.chart, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "year" }), _jsx(YAxis, { tickFormatter: (value) => `$${Math.round(Number(value) / 1000)}k` }), _jsx(Tooltip, { formatter: (value) => [formatCurrency(value), ''] }), _jsx(Legend, { layout: "horizontal", align: "left", verticalAlign: "bottom", wrapperStyle: { left: 0, bottom: -10 } }), _jsx(Line, { type: "monotone", dataKey: "Promedio", stroke: "#0d3f73", dot: false, strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "Mejor", stroke: "#059669", dot: false, strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "Peor", stroke: "#dc2626", dot: false, strokeWidth: 2 })] }) }) }), _jsxs("div", { style: { marginTop: 10, borderTop: '1px solid #cbd5e1', paddingTop: 10 }, children: [_jsx("div", { style: { color: '#64748b', fontSize: 13, fontWeight: 600 }, children: "Dinero invertido" }), _jsx("div", { style: { fontSize: 16, fontWeight: 700, color: '#0b1f44' }, children: investmentAmount ? formatCurrency(investmentAmount) : 'No definido' })] })] }))] }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 12, padding: 12 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 6, color: '#0b1f44' }, children: [_jsx(ShieldCheck, { size: 16 }), " ", _jsx("strong", { children: "Estructura de portafolio" })] }), allocation && (_jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }, children: [_jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 8, padding: 8 }, children: [_jsxs("div", { children: [_jsx("strong", { children: "Objetivo:" }), " ", allocation.objetivo] }), _jsxs("div", { children: ["Retorno: ", formatPercent(allocation.retornoPromedio)] }), _jsxs("div", { children: ["Mejor: ", formatPercent(allocation.mejorEscenario)] }), _jsxs("div", { children: ["Riesgo: ", formatPercent(allocation.maxRiesgoAnual)] })] }), _jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 8, padding: 8 }, children: [_jsxs("div", { children: ["Acciones: ", allocation.acciones] }), _jsxs("div", { children: ["Bonos: ", allocation.bonos] }), _jsxs("div", { children: ["Efectivo: ", allocation.efectivo] })] })] }), _jsx("div", { style: { marginTop: 8, display: 'grid', gap: 6 }, children: allocation.subclases.map(([name, percent]) => (_jsxs("div", { style: { border: '2px solid #0b1f44', borderRadius: 8, padding: 8 }, children: [_jsx("div", { style: { fontWeight: 600 }, children: name }), _jsxs("div", { children: ["Asignaci\u00F3n: ", percent] })] }, name))) })] }))] })] })] })] })] })), _jsxs("div", { style: { marginTop: 16, display: 'flex', justifyContent: 'space-between', gap: 8 }, children: [_jsxs("div", { style: { display: 'flex', gap: 8 }, children: [step > 0 && _jsxs("button", { onClick: prevStep, style: { borderRadius: 10, border: '1px solid #cbd5e1', padding: '10px 14px' }, children: [_jsx(ChevronLeft, { size: 16 }), " Volver"] }), _jsxs("button", { onClick: resetAll, style: { borderRadius: 10, border: '1px solid #cbd5e1', padding: '10px 14px' }, children: [_jsx(RotateCcw, { size: 16 }), " Reiniciar"] })] }), !isResult && (_jsxs("button", { onClick: nextStep, style: { borderRadius: 10, background: '#1d4ed8', color: 'white', border: 'none', padding: '10px 14px' }, disabled: isIntro ? !canContinueFromIntro : !hasSelectedCurrent, children: [isIntro ? 'Comenzar' : step === totalQuestions ? 'Ver resultado' : 'Siguiente', " ", _jsx(ChevronRight, { size: 16 })] }))] })] })] }) }) }));
}
export default App;
