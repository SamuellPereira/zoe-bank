import { useEffect, useRef, useState } from 'react';
import { colors } from './src/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';
type Screen = 'home' | 'pix' | 'transfer' | 'statement' | 'organize' | 'invest';
type PixStep = 'menu' | 'key' | 'contact' | 'copy';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [pixStep, setPixStep] = useState<PixStep>('menu');
  const [pixKey, setPixKey] = useState('');
  const [pixAmount, setPixAmount] = useState('');
  const [pixCode, setPixCode] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiReply, setAiReply] = useState('Oi! Sou a Zoe. Posso te orientar no Pix e ajudar você a conferir os dados antes de continuar.');
  const [notice, setNotice] = useState('');

  const menuProgress = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const screenTransitionOpacity = useRef(new Animated.Value(1)).current;
  const screenTransitionX = useRef(new Animated.Value(0)).current;

  const systemColorScheme = useColorScheme();
  const isDark =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
      : themeMode === 'dark';

  const theme = isDark ? colors.dark : colors.light;

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuMounted(true);
      menuProgress.setValue(0);

      Animated.timing(menuProgress, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else if (isMenuMounted) {
      Animated.timing(menuProgress, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setIsMenuMounted(false);
        }
      });
    }
  }, [isMenuOpen]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 22,
      paddingTop: 24,
      paddingBottom: 24,
    },
    greeting: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.text,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 5,
    },
    profileButton: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: theme.cyanLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileText: {
      color: theme.cyanDark,
      fontSize: 20,
      fontWeight: '700',
    },
    balanceCard: {
      backgroundColor: theme.surface,
      marginHorizontal: 20,
      padding: 24,
      borderRadius: 22,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0 : 0.06,
      shadowRadius: 12,
      elevation: isDark ? 0 : 3,
    },
    balanceCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    balanceLabel: {
      color: theme.textSecondary,
      fontSize: 14,
    },
    balanceValue: {
      color: theme.text,
      fontSize: 32,
      fontWeight: '700',
      marginTop: 16,
    },
    balanceDescription: {
      color: theme.textSecondary,
      fontSize: 13,
      marginTop: 8,
    },
    balanceBadge: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: theme.cyanLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    balanceBadgeText: {
      color: theme.cyanDark,
      fontSize: 14,
      fontWeight: '700',
    },
    balanceGradient: {
      height: 4,
      borderRadius: 4,
      marginTop: 22,
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: '700',
      marginHorizontal: 22,
      marginBottom: 18,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginBottom: 18,
    },
    action: {
      width: '30%',
      alignItems: 'center',
      gap: 9,
    },
    actionIcon: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: theme.cyanLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionIconGreen: {
      backgroundColor: isDark ? '#183A2A' : '#E4F7E9',
    },
    actionText: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
    },
    centeredActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 26,
      marginBottom: 32,
    },
    centeredAction: {
      width: 100,
      alignItems: 'center',
      gap: 9,
    },
    centeredActionIcon: {
      width: 64,
      height: 64,
      borderRadius: 20,
      backgroundColor: isDark ? '#183A2A' : '#E4F7E9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    screenHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 22,
      paddingTop: 24,
      paddingBottom: 24,
      gap: 14,
    },
    screenBack: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    screenBackText: { color: theme.text, fontSize: 27, marginTop: -3 },
    screenTitle: { color: theme.text, fontSize: 24, fontWeight: '700' },
    screenSubtitle: { color: theme.textSecondary, fontSize: 13, marginTop: 4 },
    screenCard: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 20,
      marginBottom: 14,
      padding: 17,
    },
    screenCardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    screenIcon: {
      width: 48, height: 48, borderRadius: 15,
      backgroundColor: theme.cyanLight, alignItems: 'center', justifyContent: 'center',
    },
    screenIconText: { color: theme.cyanDark, fontSize: 23, fontWeight: '700' },
    screenCardTitle: { color: theme.text, fontSize: 15, fontWeight: '700' },
    screenCardDescription: { color: theme.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 4 },
    fieldLabel: { color: theme.text, fontSize: 13, fontWeight: '600', marginBottom: 8 },
    textField: {
      color: theme.text, backgroundColor: theme.background, borderColor: theme.border,
      borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13,
      fontSize: 15, marginBottom: 16,
    },
    primaryButton: {
      backgroundColor: theme.cyan, borderRadius: 13, paddingVertical: 15,
      alignItems: 'center', justifyContent: 'center', marginTop: 4,
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
    secondaryButton: {
      backgroundColor: theme.cyanLight, borderRadius: 13, paddingVertical: 14,
      alignItems: 'center', justifyContent: 'center', marginTop: 10,
    },
    secondaryButtonText: { color: theme.cyanDark, fontSize: 14, fontWeight: '700' },
    greenNotice: {
      backgroundColor: isDark ? '#183A2A' : '#E4F7E9', borderRadius: 13,
      padding: 13, marginHorizontal: 20, marginBottom: 16,
    },
    greenNoticeText: { color: isDark ? '#B6F2C9' : '#14532D', fontSize: 12, lineHeight: 18 },
    contactInitial: {
      width: 42, height: 42, borderRadius: 21, backgroundColor: theme.cyanLight,
      alignItems: 'center', justifyContent: 'center',
    },
    contactInitialText: { color: theme.cyanDark, fontSize: 16, fontWeight: '700' },
    aiChatCard: {
      backgroundColor: isDark ? '#16343C' : '#E8F8FC', borderColor: isDark ? '#28525B' : '#C4EDF5',
      borderWidth: 1, borderRadius: 18, marginHorizontal: 20, padding: 16, marginBottom: 16,
    },
    aiChatText: { color: theme.text, fontSize: 13, lineHeight: 20 },
    noticeText: { color: theme.cyanDark, fontSize: 13, fontWeight: '600', marginTop: 12 },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    seeAll: {
      color: theme.cyanDark,
      fontSize: 13,
      fontWeight: '600',
      marginRight: 22,
    },
    transaction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    transactionIcon: {
      width: 46,
      height: 46,
      borderRadius: 15,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transactionEmoji: {
      fontSize: 21,
    },
    transactionInfo: {
      flex: 1,
      marginLeft: 12,
    },
    transactionTitle: {
      fontSize: 14,
      color: theme.text,
      fontWeight: '600',
    },
    transactionDate: {
      color: theme.textSecondary,
      fontSize: 12,
      marginTop: 5,
    },
    income: {
      color: '#15966B',
      fontSize: 12,
      fontWeight: '700',
    },
    expense: {
      color: '#D64545',
      fontSize: 12,
      fontWeight: '700',
    },
    aiCard: {
      backgroundColor: theme.surface,
      marginHorizontal: 20,
      marginTop: 28,
      padding: 22,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    aiLabel: {
      color: theme.cyan,
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 1,
    },
    aiTitle: {
      color: theme.text,
      fontSize: 20,
      fontWeight: '700',
      marginTop: 12,
    },
    aiDescription: {
      color: theme.textSecondary,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 8,
    },
    aiButton: {
      alignSelf: 'flex-start',
      backgroundColor: theme.cyanLight,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginTop: 18,
    },
    aiButtonText: {
      color: theme.cyanDark,
      fontWeight: '700',
      fontSize: 13,
    },
    disclaimer: {
      color: theme.textSecondary,
      textAlign: 'center',
      fontSize: 11,
      marginTop: 24,
      marginBottom: 28,
    },
    menuOverlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    menuBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    sideMenu: {
      width: '82%',
      maxWidth: 360,
      height: '100%',
      paddingTop: 55,
      paddingHorizontal: 22,
      backgroundColor: theme.surface,
      elevation: 12,
      shadowColor: '#000000',
      shadowOffset: { width: -4, height: 0 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
    menuHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    menuDivider: {
      height: 1,
      backgroundColor: theme.border,
      marginBottom: 18,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 18,
    },
    menuItemText: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
    },
    settingsOverlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 20,
      backgroundColor: theme.background,
    },
    settingsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 22,
      paddingTop: 24,
      paddingBottom: 24,
      gap: 16,
    },
    backButton: {
      fontSize: 27,
      color: theme.text,
    },
    settingsTitle: {
      fontSize: 23,
      fontWeight: '700',
      color: theme.text,
    },
    settingsDescription: {
      fontSize: 14,
      lineHeight: 21,
      color: theme.textSecondary,
      marginHorizontal: 22,
      marginBottom: 24,
    },
    settingsCard: {
      backgroundColor: theme.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 20,
      padding: 18,
    },
    settingsSectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 8,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    themeOptionLast: {
      borderBottomWidth: 0,
    },
    themeOptionText: {
      fontSize: 15,
      color: theme.text,
      fontWeight: '500',
    },
    themeOptionHint: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },
    selectedMark: {
      color: theme.cyan,
      fontSize: 19,
      fontWeight: '700',
    },
  });

  const navigateToScreen = (screen: Screen) => {
    if (screen === activeScreen) return;

    Animated.parallel([
      Animated.timing(screenTransitionOpacity, {
        toValue: 0,
        duration: 130,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(screenTransitionX, {
        toValue: -12,
        duration: 130,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) return;
      setActiveScreen(screen);
      screenTransitionX.setValue(14);
      screenTransitionOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(screenTransitionOpacity, {
          toValue: 1,
          duration: 230,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(screenTransitionX, {
          toValue: 0,
          duration: 230,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const changePixStep = (step: PixStep) => {
    Animated.parallel([
      Animated.timing(screenTransitionOpacity, {
        toValue: 0,
        duration: 100,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(screenTransitionX, {
        toValue: -8,
        duration: 100,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) return;
      setPixStep(step);
      screenTransitionX.setValue(10);
      Animated.parallel([
        Animated.timing(screenTransitionOpacity, {
          toValue: 1,
          duration: 190,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(screenTransitionX, {
          toValue: 0,
          duration: 190,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const chooseTheme = (mode: ThemeMode) => {
    if (mode === themeMode) return;

    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      setThemeMode(mode);

      requestAnimationFrame(() => {
        Animated.timing(screenOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Animated.View style={{ flex: 1, opacity: screenOpacity }}>
        <Animated.View
          style={{
            flex: 1,
            opacity: screenTransitionOpacity,
            transform: [{ translateX: screenTransitionX }],
          }}
        >
        {activeScreen === 'home' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Olá, Samuel 👋</Text>
              <Text style={styles.subtitle}>Bem-vindo ao seu banco</Text>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setIsMenuOpen(true)}
              accessibilityLabel="Abrir menu do perfil"
            >
              <Text style={styles.profileText}>S</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceCard}>
            <View style={styles.balanceCardHeader}>
              <Text style={styles.balanceLabel}>Saldo disponível</Text>
              <View style={styles.balanceBadge}>
                <Text style={styles.balanceBadgeText}>R$</Text>
              </View>
            </View>

            <Text style={styles.balanceValue}>R$ 5.280,50</Text>
            <Text style={styles.balanceDescription}>
              Seu dinheiro, sob seu controle.
            </Text>

            <LinearGradient
              colors={['#DDF8FC', '#00B8D9', '#087CA7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.balanceGradient}
            />
          </View>

          <Text style={styles.sectionTitle}>Acesso rápido</Text>

          <View style={styles.actions}>
            <TouchableOpacity activeOpacity={0.72} style={styles.action} onPress={() => navigateToScreen('transfer')}>
              <View style={styles.actionIcon}><Ionicons name="swap-horizontal" size={25} color={theme.cyanDark} /></View>
              <Text style={styles.actionText}>Transferir</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.72} style={styles.action} onPress={() => navigateToScreen('statement')}>
              <View style={styles.actionIcon}><Ionicons name="receipt-outline" size={24} color={theme.cyanDark} /></View>
              <Text style={styles.actionText}>Extrato</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.72} style={styles.action} onPress={() => navigateToScreen('organize')}>
              <View style={styles.actionIcon}><Ionicons name="wallet-outline" size={24} color={theme.cyanDark} /></View>
              <Text style={styles.actionText}>Organizar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centeredActions}>
            <TouchableOpacity activeOpacity={0.72} style={styles.centeredAction} onPress={() => { setPixStep('menu'); setNotice(''); navigateToScreen('pix'); }}>
              <View style={styles.centeredActionIcon}><Ionicons name="qr-code-outline" size={28} color={isDark ? '#7BE0A2' : '#168348'} /></View>
              <Text style={styles.actionText}>Pix</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.72} style={styles.centeredAction} onPress={() => navigateToScreen('invest')}>
              <View style={styles.centeredActionIcon}><Ionicons name="trending-up-outline" size={28} color={isDark ? '#7BE0A2' : '#168348'} /></View>
              <Text style={styles.actionText}>Investir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Últimas movimentações</Text>
            <Text style={styles.seeAll}>Ver todas</Text>
          </View>

          <View style={styles.transaction}>
            <View style={styles.transactionIcon}>
              <Ionicons name="briefcase-outline" size={21} color={theme.cyanDark} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Salário</Text>
              <Text style={styles.transactionDate}>Hoje, 08:30</Text>
            </View>
            <Text style={styles.income}>+ R$ 3.500,00</Text>
          </View>

          <View style={styles.transaction}>
            <View style={styles.transactionIcon}>
              <Ionicons name="cart-outline" size={21} color={theme.cyanDark} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Supermercado</Text>
              <Text style={styles.transactionDate}>Ontem, 17:42</Text>
            </View>
            <Text style={styles.expense}>- R$ 185,90</Text>
          </View>

          <View style={styles.aiCard}>
            <Text style={styles.aiLabel}>✧ ZOE INTELIGÊNCIA</Text>
            <Text style={styles.aiTitle}>Seu dinheiro mais inteligente.</Text>
            <Text style={styles.aiDescription}>
              Em breve, seu assistente financeiro vai ajudar você a entender
              seus gastos e planejar seu futuro.
            </Text>

            <TouchableOpacity style={styles.aiButton}>
              <Text style={styles.aiButtonText}>Conhecer a Zoe AI →</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Ambiente demonstrativo • Dados fictícios
          </Text>
        </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={styles.screenHeader}>
              <TouchableOpacity style={styles.screenBack} onPress={() => { setNotice(''); navigateToScreen('home'); }} accessibilityLabel="Voltar para início">
                <Ionicons name="arrow-back" size={21} color={theme.text} />
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={styles.screenTitle}>
                  {activeScreen === 'pix' ? 'Área Pix' : activeScreen === 'invest' ? 'Investir' : activeScreen === 'transfer' ? 'Transferir' : activeScreen === 'statement' ? 'Extrato' : 'Organizar'}
                </Text>
                <Text style={styles.screenSubtitle}>
                  {activeScreen === 'pix' ? 'Pague, envie e tire suas dúvidas' : activeScreen === 'invest' ? 'Conheça opções e planeje seus objetivos' : activeScreen === 'transfer' ? 'Transferência demonstrativa' : activeScreen === 'statement' ? 'Suas movimentações fictícias' : 'Cuide melhor do seu dinheiro'}
                </Text>
              </View>
            </View>

            {activeScreen === 'pix' && (
              <>
                <View style={styles.greenNotice}>
                  <Text style={styles.greenNoticeText}>Ambiente de demonstração. Nenhum Pix real será enviado e nenhum dado bancário será consultado.</Text>
                </View>
                {pixStep === 'menu' && (
                  <>
                    <TouchableOpacity activeOpacity={0.78} style={styles.screenCard} onPress={() => { setNotice(''); changePixStep('key'); }}>
                      <View style={styles.screenCardRow}><View style={styles.screenIcon}><Ionicons name="key-outline" size={23} color={theme.cyanDark} /></View><View style={{ flex: 1 }}><Text style={styles.screenCardTitle}>Enviar por chave Pix</Text><Text style={styles.screenCardDescription}>CPF, telefone, e-mail ou chave aleatória</Text></View><Ionicons name="chevron-forward" size={20} color={theme.textSecondary} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.78} style={styles.screenCard} onPress={() => { setNotice(''); changePixStep('contact'); }}>
                      <View style={styles.screenCardRow}><View style={styles.screenIcon}><Ionicons name="people-outline" size={23} color={theme.cyanDark} /></View><View style={{ flex: 1 }}><Text style={styles.screenCardTitle}>Escolher contato</Text><Text style={styles.screenCardDescription}>Selecione um destinatário de exemplo</Text></View><Ionicons name="chevron-forward" size={20} color={theme.textSecondary} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.78} style={styles.screenCard} onPress={() => { setNotice(''); changePixStep('copy'); }}>
                      <View style={styles.screenCardRow}><View style={styles.screenIcon}><Ionicons name="qr-code-outline" size={23} color={theme.cyanDark} /></View><View style={{ flex: 1 }}><Text style={styles.screenCardTitle}>QR Code ou Copia e Cola</Text><Text style={styles.screenCardDescription}>Simule a leitura ou cole um código de exemplo</Text></View><Ionicons name="chevron-forward" size={20} color={theme.textSecondary} /></View>
                    </TouchableOpacity>
                  </>
                )}
                {pixStep === 'key' && (
                  <View style={styles.screenCard}>
                    <Text style={styles.screenCardTitle}>Enviar por chave Pix</Text>
                    <Text style={[styles.screenCardDescription, { marginBottom: 18 }]}>Preencha os dados fictícios para ver uma revisão antes do envio.</Text>
                    <Text style={styles.fieldLabel}>Chave Pix do destinatário</Text>
                    <TextInput style={styles.textField} value={pixKey} onChangeText={setPixKey} placeholder="CPF, e-mail, telefone ou chave" placeholderTextColor={theme.textSecondary} autoCapitalize="none" />
                    <Text style={styles.fieldLabel}>Valor (R$)</Text>
                    <TextInput style={styles.textField} value={pixAmount} onChangeText={setPixAmount} placeholder="0,00" placeholderTextColor={theme.textSecondary} keyboardType="decimal-pad" />
                    <TouchableOpacity style={styles.primaryButton} onPress={() => setNotice(pixKey.trim() && pixAmount.trim() ? `Revisão simulada: chave ${pixKey} • valor R$ ${pixAmount}. Confira os dados antes de qualquer envio real.` : 'Preencha a chave Pix e o valor para continuar.') }><Text style={styles.primaryButtonText}>Revisar Pix</Text></TouchableOpacity>
                    {notice !== '' && <Text style={styles.noticeText}>{notice}</Text>}
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => { setNotice(''); changePixStep('menu'); }}><Text style={styles.secondaryButtonText}>Voltar às opções</Text></TouchableOpacity>
                  </View>
                )}
                {pixStep === 'contact' && (
                  <View style={styles.screenCard}>
                    <Text style={styles.screenCardTitle}>Contatos de exemplo</Text>
                    <Text style={[styles.screenCardDescription, { marginBottom: 16 }]}>Estes destinatários são fictícios e servem apenas para testar a interface.</Text>
                    {['Mariana Costa', 'Lucas Almeida', 'Ana Souza'].map((name, index) => (
                      <TouchableOpacity key={name} style={[styles.screenCardRow, { paddingVertical: 12, borderBottomWidth: index === 2 ? 0 : 1, borderBottomColor: theme.border }]} onPress={() => { setPixKey(name); setPixStep('key'); setNotice(`Contato selecionado: ${name}. Informe um valor para simular a revisão.`); }}>
                        <View style={styles.contactInitial}><Text style={styles.contactInitialText}>{name.split(' ').map(part => part[0]).join('').slice(0, 2)}</Text></View><View style={{ flex: 1 }}><Text style={styles.screenCardTitle}>{name}</Text><Text style={styles.screenCardDescription}>Contato demonstrativo</Text></View><Text style={{ color: theme.textSecondary, fontSize: 22 }}>›</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {pixStep === 'copy' && (
                  <View style={styles.screenCard}>
                    <Text style={styles.screenCardTitle}>Pix Copia e Cola</Text>
                    <Text style={[styles.screenCardDescription, { marginBottom: 16 }]}>Cole um código fictício para simular a conferência.</Text>
                    <TextInput style={[styles.textField, { minHeight: 100, textAlignVertical: 'top' }]} value={pixCode} onChangeText={setPixCode} placeholder="Cole aqui o código de exemplo" placeholderTextColor={theme.textSecondary} multiline />
                    <TouchableOpacity style={styles.primaryButton} onPress={() => setNotice(pixCode.trim() ? 'Código recebido na demonstração. Não foi validado nem processado.' : 'Cole um código de exemplo primeiro.')}><Text style={styles.primaryButtonText}>Conferir código</Text></TouchableOpacity>
                    {notice !== '' && <Text style={styles.noticeText}>{notice}</Text>}
                    <TouchableOpacity style={styles.secondaryButton} onPress={() => { setNotice(''); changePixStep('menu'); }}><Text style={styles.secondaryButtonText}>Voltar às opções</Text></TouchableOpacity>
                  </View>
                )}
                <View style={styles.aiChatCard}>
                  <Text style={[styles.aiLabel, { marginBottom: 10 }]}>✦ ZOE IA • AJUDA COM PIX</Text>
                  <Text style={styles.aiChatText}>{aiReply}</Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
                    <View style={{ flex: 1 }}><TextInput style={[styles.textField, { marginBottom: 0 }]} value={aiQuestion} onChangeText={setAiQuestion} placeholder="Pergunte algo sobre o Pix..." placeholderTextColor={theme.textSecondary} returnKeyType="send" onSubmitEditing={() => { const q = aiQuestion.trim().toLowerCase(); setAiReply(q.includes('golpe') || q.includes('seguro') ? 'Para se proteger, confira o nome e os dados do destinatário, desconfie de urgência e nunca compartilhe senhas ou códigos. Esta assistente é demonstrativa e não verifica chaves.' : q.includes('chave') ? 'A chave Pix pode ser CPF/CNPJ, telefone, e-mail ou uma chave aleatória. Digite a chave com cuidado e confira os dados do destinatário antes de confirmar.' : q.includes('valor') || q.includes('enviar') ? 'Escolha “Enviar por chave Pix”, preencha a chave e o valor e revise tudo com calma. No Zoe Bank, esta etapa só simula a revisão — não envia dinheiro.' : 'Posso explicar como usar uma chave, escolher um contato ou conferir os cuidados contra golpes. O Zoe Bank ainda não faz transações reais.'); setAiQuestion(''); }} /></View>
                    <TouchableOpacity style={{ backgroundColor: theme.cyan, borderRadius: 12, paddingHorizontal: 15, justifyContent: 'center' }} onPress={() => { const q = aiQuestion.trim().toLowerCase(); if (!q) { setAiReply('Escreva uma dúvida para eu ajudar!'); return; } setAiReply(q.includes('golpe') || q.includes('seguro') ? 'Para se proteger, confira o nome e os dados do destinatário, desconfie de urgência e nunca compartilhe senhas ou códigos. Esta assistente é demonstrativa e não verifica chaves.' : q.includes('chave') ? 'A chave Pix pode ser CPF/CNPJ, telefone, e-mail ou uma chave aleatória. Digite a chave com cuidado e confira os dados do destinatário antes de confirmar.' : q.includes('valor') || q.includes('enviar') ? 'Escolha “Enviar por chave Pix”, preencha a chave e o valor e revise tudo com calma. No Zoe Bank, esta etapa só simula a revisão — não envia dinheiro.' : 'Posso explicar como usar uma chave, escolher um contato ou conferir os cuidados contra golpes. O Zoe Bank ainda não faz transações reais.'); setAiQuestion(''); }}><Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Enviar</Text></TouchableOpacity>
                  </View>
                  <Text style={[styles.screenCardDescription, { marginTop: 10 }]}>A Zoe oferece respostas demonstrativas; ainda não está conectada a uma IA externa.</Text>
                </View>
              </>
            )}

            {activeScreen === 'invest' && (
              <>
                <View style={styles.greenNotice}><Text style={styles.greenNoticeText}>Área educativa demonstrativa. Não há investimentos reais, conta de corretora ou promessa de rendimento.</Text></View>
                <View style={styles.screenCard}><Text style={styles.screenCardTitle}>Comece pelos seus objetivos</Text><Text style={styles.screenCardDescription}>Aprenda sobre reserva de emergência, renda fixa e diversificação antes de investir.</Text></View>
                {['Reserva de emergência', 'Conhecer renda fixa', 'Entender riscos e diversificação'].map((item, index) => <View key={item} style={styles.screenCard}><View style={styles.screenCardRow}><View style={styles.screenIcon}><Ionicons name={index === 0 ? 'shield-checkmark-outline' : index === 1 ? 'trending-up-outline' : 'git-network-outline'} size={23} color={theme.cyanDark} /></View><View style={{ flex: 1 }}><Text style={styles.screenCardTitle}>{item}</Text><Text style={styles.screenCardDescription}>{index === 0 ? 'Organize uma reserva para imprevistos.' : index === 1 ? 'Conheça conceitos como liquidez e prazo.' : 'Entenda que todo investimento envolve riscos.'}</Text></View></View></View>)}
              </>
            )}
            {activeScreen === 'transfer' && <View style={styles.screenCard}><Text style={styles.screenCardTitle}>Transferência demonstrativa</Text><Text style={styles.screenCardDescription}>Esta tela será desenvolvida depois. Nenhuma transferência real está disponível neste protótipo.</Text><TouchableOpacity style={styles.primaryButton} onPress={() => setNotice('Fluxo de transferência ainda não implementado.')}><Text style={styles.primaryButtonText}>Iniciar simulação</Text></TouchableOpacity>{notice !== '' && <Text style={styles.noticeText}>{notice}</Text>}</View>}
            {activeScreen === 'statement' && <><View style={styles.screenCard}><Text style={styles.screenCardTitle}>Movimentações recentes</Text></View><View style={styles.transaction}><View style={styles.transactionIcon}><Ionicons name="briefcase-outline" size={21} color={theme.cyanDark} /></View><View style={styles.transactionInfo}><Text style={styles.transactionTitle}>Salário</Text><Text style={styles.transactionDate}>Hoje, 08:30</Text></View><Text style={styles.income}>+ R$ 3.500,00</Text></View><View style={styles.transaction}><View style={styles.transactionIcon}><Ionicons name="cart-outline" size={21} color={theme.cyanDark} /></View><View style={styles.transactionInfo}><Text style={styles.transactionTitle}>Supermercado</Text><Text style={styles.transactionDate}>Ontem, 17:42</Text></View><Text style={styles.expense}>- R$ 185,90</Text></View></>}
            {activeScreen === 'organize' && <><View style={styles.greenNotice}><Text style={styles.greenNoticeText}>Valores fictícios usados apenas para demonstrar a organização financeira.</Text></View><View style={styles.screenCard}><Text style={styles.screenCardTitle}>Resumo do mês</Text><Text style={styles.screenCardDescription}>Receitas: R$ 3.500,00</Text><Text style={[styles.screenCardDescription, { marginTop: 8 }]}>Despesas: R$ 185,90</Text><Text style={[styles.screenCardTitle, { marginTop: 14 }]}>Categorias</Text></View>{['Moradia', 'Alimentação', 'Transporte', 'Lazer'].map((item, index) => <View key={item} style={styles.screenCard}><Text style={styles.screenCardTitle}>{item}</Text><Text style={styles.screenCardDescription}>{['R$ 0,00', 'R$ 185,90', 'R$ 0,00', 'R$ 0,00'][index]} • valores de exemplo</Text></View>)}</>}
            <Text style={styles.disclaimer}>Zoe Bank • Ambiente demonstrativo • Dados fictícios</Text>
          </ScrollView>
        )}
        </Animated.View>

        {isMenuMounted && activeScreen === 'home' && (
          <Animated.View
            style={[
              styles.menuOverlay,
              {
                opacity: menuProgress,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuBackdrop}
              onPress={() => setIsMenuOpen(false)}
              accessibilityLabel="Fechar menu"
            />

            <Animated.View
              style={[
                styles.sideMenu,
                {
                  transform: [
                    {
                      translateX: menuProgress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [320, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.menuHeader}>
                <View style={styles.profileButton}>
                  <Text style={styles.profileText}>S</Text>
                </View>

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.greeting}>Samuel</Text>
                  <Text style={styles.subtitle}>Minha conta</Text>
                </View>

                <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                  <Text style={{ color: theme.text, fontSize: 28 }}>×</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setIsMenuOpen(false);
                  setShowSettings(true);
                }}
              >
                <Text style={styles.menuItemText}>⚙  Configurações</Text>
                <Text style={{ color: theme.textSecondary, fontSize: 22 }}>
                  ›
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        )}

        {showSettings && (
          <View style={styles.settingsOverlay}>
            <View style={styles.settingsHeader}>
              <TouchableOpacity
                onPress={() => setShowSettings(false)}
                accessibilityLabel="Voltar"
              >
                <Text style={styles.backButton}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.settingsTitle}>Configurações</Text>
            </View>

            <Text style={styles.settingsDescription}>
              Personalize a aparência do Zoe Bank para deixar o aplicativo
              do seu jeito.
            </Text>

            <View style={styles.settingsCard}>
              <Text style={styles.settingsSectionTitle}>Aparência</Text>

              <TouchableOpacity
                style={styles.themeOption}
                onPress={() => chooseTheme('light')}
              >
                <View>
                  <Text style={styles.themeOptionText}>☀️  Tema claro</Text>
                  <Text style={styles.themeOptionHint}>
                    Fundo claro e cartões brancos
                  </Text>
                </View>
                {themeMode === 'light' && (
                  <Text style={styles.selectedMark}>✓</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.themeOption}
                onPress={() => chooseTheme('dark')}
              >
                <View>
                  <Text style={styles.themeOptionText}>🌙  Tema escuro</Text>
                  <Text style={styles.themeOptionHint}>
                    Fundo escuro e detalhes em ciano
                  </Text>
                </View>
                {themeMode === 'dark' && (
                  <Text style={styles.selectedMark}>✓</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.themeOption, styles.themeOptionLast]}
                onPress={() => chooseTheme('system')}
              >
                <View>
                  <Text style={styles.themeOptionText}>
                    📱  Seguir o sistema
                  </Text>
                  <Text style={styles.themeOptionHint}>
                    Usar a aparência do seu dispositivo
                  </Text>
                </View>
                {themeMode === 'system' && (
                  <Text style={styles.selectedMark}>✓</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}
