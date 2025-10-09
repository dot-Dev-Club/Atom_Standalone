const API_BASE_URL = 'https://api.atom.org.in';

interface RegistrationData {
  name: string;
  reg_no: string;
  email: string;
  recipt_no: string;
  year_of_study: string;
  phone_no: string; // Frontend uses phone_no
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

    // Map frontend field names to backend field names
    const backendData = {
      name: data.name,
      reg_no: data.reg_no,
      email: data.email,
      recipt_no: data.recipt_no,
      year_of_study: data.year_of_study,
      phone_number: data.phone_no, // Backend expects phone_number
      ...(data.division && { division: data.division }),
      ...(data.dept_name && { dept_name: data.dept_name }),
      ...(data.college_name && { college_name: data.college_name }),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendData),
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
