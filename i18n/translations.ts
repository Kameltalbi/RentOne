export type Language = 'fr' | 'en' | 'ar' | 'es';

export interface Translations {
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    all: string;
    yes: string;
    no: string;
    loading: string;
    error: string;
    success: string;
  };
  tabs: {
    properties: string;
    payments: string;
    expenses: string;
    reminders: string;
  };
  property: {
    title: string;
    addProperty: string;
    propertyName: string;
    address: string;
    type: string;
    surface: string;
    monthlyRent: string;
    apartment: string;
    house: string;
    studio: string;
    other: string;
    noProperties: string;
    saveProperty: string;
    propertyDetails: string;
  };
  tenant: {
    title: string;
    addTenant: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    moveInDate: string;
    noTenants: string;
  };
  payment: {
    title: string;
    addPayment: string;
    amount: string;
    dueDate: string;
    paidDate: string;
    status: string;
    paid: string;
    pending: string;
    late: string;
    partial: string;
    totalCollected: string;
    totalPending: string;
    totalLate: string;
  };
  expense: {
    title: string;
    addExpense: string;
    category: string;
    description: string;
    amount: string;
    date: string;
    recoverable: string;
    repair: string;
    maintenance: string;
    tax: string;
    insurance: string;
    utilities: string;
    totalExpenses: string;
    recoverableExpenses: string;
  };
  reminder: {
    title: string;
    addReminder: string;
    description: string;
    dueDate: string;
    completed: string;
    overdue: string;
    rentIndexation: string;
    leaseRenewal: string;
    chargesReview: string;
  };
  settings: {
    title: string;
    language: string;
    currency: string;
    selectLanguage: string;
    selectCurrency: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      filter: 'Filtrer',
      all: 'Tous',
      yes: 'Oui',
      no: 'Non',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
    },
    tabs: {
      properties: 'Mes Biens',
      payments: 'Loyers',
      expenses: 'Dépenses',
      reminders: 'Rappels',
    },
    property: {
      title: 'Biens',
      addProperty: 'Ajouter un bien',
      propertyName: 'Nom du bien',
      address: 'Adresse',
      type: 'Type de bien',
      surface: 'Surface (m²)',
      monthlyRent: 'Loyer mensuel',
      apartment: 'Appartement',
      house: 'Maison',
      studio: 'Studio',
      other: 'Autre',
      noProperties: 'Aucun bien enregistré',
      saveProperty: 'Enregistrer le bien',
      propertyDetails: 'Détails du bien',
    },
    tenant: {
      title: 'Locataires',
      addTenant: 'Ajouter un locataire',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      moveInDate: "Date d'entrée",
      noTenants: 'Aucun locataire',
    },
    payment: {
      title: 'Loyers',
      addPayment: 'Ajouter un paiement',
      amount: 'Montant',
      dueDate: 'Date d\'échéance',
      paidDate: 'Date de paiement',
      status: 'Statut',
      paid: 'Payé',
      pending: 'En attente',
      late: 'En retard',
      partial: 'Partiel',
      totalCollected: 'Total encaissé',
      totalPending: 'En attente',
      totalLate: 'En retard',
    },
    expense: {
      title: 'Dépenses',
      addExpense: 'Ajouter une dépense',
      category: 'Catégorie',
      description: 'Description',
      amount: 'Montant',
      date: 'Date',
      recoverable: 'Récupérable',
      repair: 'Réparation',
      maintenance: 'Entretien',
      tax: 'Taxe',
      insurance: 'Assurance',
      utilities: 'Charges',
      totalExpenses: 'Total dépenses',
      recoverableExpenses: 'Récupérable',
    },
    reminder: {
      title: 'Rappels',
      addReminder: 'Ajouter un rappel',
      description: 'Description',
      dueDate: 'Date',
      completed: 'Terminé',
      overdue: 'En retard',
      rentIndexation: 'Indexation loyer',
      leaseRenewal: 'Renouvellement bail',
      chargesReview: 'Révision charges',
    },
    settings: {
      title: 'Paramètres',
      language: 'Langue',
      currency: 'Devise',
      selectLanguage: 'Choisir la langue',
      selectCurrency: 'Choisir la devise',
    },
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      yes: 'Yes',
      no: 'No',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    tabs: {
      properties: 'Properties',
      payments: 'Rent',
      expenses: 'Expenses',
      reminders: 'Reminders',
    },
    property: {
      title: 'Properties',
      addProperty: 'Add Property',
      propertyName: 'Property Name',
      address: 'Address',
      type: 'Property Type',
      surface: 'Surface (m²)',
      monthlyRent: 'Monthly Rent',
      apartment: 'Apartment',
      house: 'House',
      studio: 'Studio',
      other: 'Other',
      noProperties: 'No properties registered',
      saveProperty: 'Save Property',
      propertyDetails: 'Property Details',
    },
    tenant: {
      title: 'Tenants',
      addTenant: 'Add Tenant',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      moveInDate: 'Move-in Date',
      noTenants: 'No tenants',
    },
    payment: {
      title: 'Rent Payments',
      addPayment: 'Add Payment',
      amount: 'Amount',
      dueDate: 'Due Date',
      paidDate: 'Payment Date',
      status: 'Status',
      paid: 'Paid',
      pending: 'Pending',
      late: 'Late',
      partial: 'Partial',
      totalCollected: 'Total Collected',
      totalPending: 'Pending',
      totalLate: 'Late',
    },
    expense: {
      title: 'Expenses',
      addExpense: 'Add Expense',
      category: 'Category',
      description: 'Description',
      amount: 'Amount',
      date: 'Date',
      recoverable: 'Recoverable',
      repair: 'Repair',
      maintenance: 'Maintenance',
      tax: 'Tax',
      insurance: 'Insurance',
      utilities: 'Utilities',
      totalExpenses: 'Total Expenses',
      recoverableExpenses: 'Recoverable',
    },
    reminder: {
      title: 'Reminders',
      addReminder: 'Add Reminder',
      description: 'Description',
      dueDate: 'Date',
      completed: 'Completed',
      overdue: 'Overdue',
      rentIndexation: 'Rent Indexation',
      leaseRenewal: 'Lease Renewal',
      chargesReview: 'Charges Review',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      currency: 'Currency',
      selectLanguage: 'Select Language',
      selectCurrency: 'Select Currency',
    },
  },
  ar: {
    common: {
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      search: 'بحث',
      filter: 'تصفية',
      all: 'الكل',
      yes: 'نعم',
      no: 'لا',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
    },
    tabs: {
      properties: 'عقاراتي',
      payments: 'الإيجارات',
      expenses: 'المصاريف',
      reminders: 'التذكيرات',
    },
    property: {
      title: 'العقارات',
      addProperty: 'إضافة عقار',
      propertyName: 'اسم العقار',
      address: 'العنوان',
      type: 'نوع العقار',
      surface: 'المساحة (م²)',
      monthlyRent: 'الإيجار الشهري',
      apartment: 'شقة',
      house: 'منزل',
      studio: 'استوديو',
      other: 'أخرى',
      noProperties: 'لا توجد عقارات مسجلة',
      saveProperty: 'حفظ العقار',
      propertyDetails: 'تفاصيل العقار',
    },
    tenant: {
      title: 'المستأجرون',
      addTenant: 'إضافة مستأجر',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      moveInDate: 'تاريخ الدخول',
      noTenants: 'لا يوجد مستأجرون',
    },
    payment: {
      title: 'الإيجارات',
      addPayment: 'إضافة دفعة',
      amount: 'المبلغ',
      dueDate: 'تاريخ الاستحقاق',
      paidDate: 'تاريخ الدفع',
      status: 'الحالة',
      paid: 'مدفوع',
      pending: 'قيد الانتظار',
      late: 'متأخر',
      partial: 'جزئي',
      totalCollected: 'المجموع المحصل',
      totalPending: 'قيد الانتظار',
      totalLate: 'متأخر',
    },
    expense: {
      title: 'المصاريف',
      addExpense: 'إضافة مصروف',
      category: 'الفئة',
      description: 'الوصف',
      amount: 'المبلغ',
      date: 'التاريخ',
      recoverable: 'قابل للاسترداد',
      repair: 'إصلاح',
      maintenance: 'صيانة',
      tax: 'ضريبة',
      insurance: 'تأمين',
      utilities: 'مرافق',
      totalExpenses: 'إجمالي المصاريف',
      recoverableExpenses: 'قابل للاسترداد',
    },
    reminder: {
      title: 'التذكيرات',
      addReminder: 'إضافة تذكير',
      description: 'الوصف',
      dueDate: 'التاريخ',
      completed: 'مكتمل',
      overdue: 'متأخر',
      rentIndexation: 'فهرسة الإيجار',
      leaseRenewal: 'تجديد العقد',
      chargesReview: 'مراجعة الرسوم',
    },
    settings: {
      title: 'الإعدادات',
      language: 'اللغة',
      currency: 'العملة',
      selectLanguage: 'اختر اللغة',
      selectCurrency: 'اختر العملة',
    },
  },
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Añadir',
      search: 'Buscar',
      filter: 'Filtrar',
      all: 'Todos',
      yes: 'Sí',
      no: 'No',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
    },
    tabs: {
      properties: 'Propiedades',
      payments: 'Alquileres',
      expenses: 'Gastos',
      reminders: 'Recordatorios',
    },
    property: {
      title: 'Propiedades',
      addProperty: 'Añadir Propiedad',
      propertyName: 'Nombre de la Propiedad',
      address: 'Dirección',
      type: 'Tipo de Propiedad',
      surface: 'Superficie (m²)',
      monthlyRent: 'Alquiler Mensual',
      apartment: 'Apartamento',
      house: 'Casa',
      studio: 'Estudio',
      other: 'Otro',
      noProperties: 'No hay propiedades registradas',
      saveProperty: 'Guardar Propiedad',
      propertyDetails: 'Detalles de la Propiedad',
    },
    tenant: {
      title: 'Inquilinos',
      addTenant: 'Añadir Inquilino',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo',
      phone: 'Teléfono',
      moveInDate: 'Fecha de Entrada',
      noTenants: 'No hay inquilinos',
    },
    payment: {
      title: 'Alquileres',
      addPayment: 'Añadir Pago',
      amount: 'Cantidad',
      dueDate: 'Fecha de Vencimiento',
      paidDate: 'Fecha de Pago',
      status: 'Estado',
      paid: 'Pagado',
      pending: 'Pendiente',
      late: 'Atrasado',
      partial: 'Parcial',
      totalCollected: 'Total Cobrado',
      totalPending: 'Pendiente',
      totalLate: 'Atrasado',
    },
    expense: {
      title: 'Gastos',
      addExpense: 'Añadir Gasto',
      category: 'Categoría',
      description: 'Descripción',
      amount: 'Cantidad',
      date: 'Fecha',
      recoverable: 'Recuperable',
      repair: 'Reparación',
      maintenance: 'Mantenimiento',
      tax: 'Impuesto',
      insurance: 'Seguro',
      utilities: 'Servicios',
      totalExpenses: 'Total Gastos',
      recoverableExpenses: 'Recuperable',
    },
    reminder: {
      title: 'Recordatorios',
      addReminder: 'Añadir Recordatorio',
      description: 'Descripción',
      dueDate: 'Fecha',
      completed: 'Completado',
      overdue: 'Vencido',
      rentIndexation: 'Indexación de Alquiler',
      leaseRenewal: 'Renovación de Contrato',
      chargesReview: 'Revisión de Cargos',
    },
    settings: {
      title: 'Configuración',
      language: 'Idioma',
      currency: 'Moneda',
      selectLanguage: 'Seleccionar Idioma',
      selectCurrency: 'Seleccionar Moneda',
    },
  },
};
