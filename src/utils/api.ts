const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface RegistrationData {
  name: string;
  reg_no: string;
  email: string;
  recipt_no: string;
  year_of_study: string;
  division?: string;
  dept_name?: string;
  college_name?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export const registerParticipant = async (
  data: RegistrationData,
  type: 'internal' | 'external'
): Promise<ApiResponse> => {
  try {
    const endpoint = type === 'internal' ? '/register/internal' : '/register/external';
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: result.message || 'Registration successful!',
      data: result,
    };
  } catch (error) {
    console.error('Registration API error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred during registration',
    };
  }
};
