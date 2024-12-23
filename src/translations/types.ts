export interface Translations {
  common: {
    dashboard: string;
    leads: string;
    linkedinScanner: string;
    payments: string;
    settings: string;
    admin: string;
    save: string;
    cancel: string;
    loading: string;
    error: string;
    success: string;
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    name: string;
    role: string;
    freelancer: string;
    client: string;
    loginButton: string;
    registerButton: string;
    forgotPassword: string;
    alreadyHaveAccount: string;
    noAccount: string;
  };
  verification: {
    title: string;
    verified: string;
    requestNew: string;
    kvk: string;
    portfolio: string;
    skills: string;
    identity: string;
    status: {
      verified: string;
      pending: string;
      failed: string;
    };
  };
  client: {
    dashboard: {
      title: string;
      newProject: string;
      activeProjects: string;
      totalProjects: string;
      responses: string;
      projectStats: {
        total: string;
        active: string;
        completed: string;
      };
    };
    project: {
      new: {
        title: string;
        description: string;
        budget: string;
        deadline: string;
        requirements: string;
        submit: string;
      };
      status: {
        active: string;
        completed: string;
        cancelled: string;
      };
    };
  };
  freelancer: {
    dashboard: {
      title: string;
      availableLeads: string;
      activeProjects: string;
      earnings: string;
      stats: {
        responseRate: string;
        successRate: string;
        avgRating: string;
      };
    };
    leads: {
      new: string;
      available: string;
      responded: string;
      won: string;
      lost: string;
    };
  };
}