![Well Linked Logo](https://github.com/user-attachments/assets/82f75185-9977-41a0-968f-262b86194ea7)


## Challenge description
### ThriveConnect: Redefine Work Well-Being by [Aava](https://www.aava.fi/).
The mind breaks under the weight of work when it becomes too much. Yet, companies still don't pay enough attention to this.
Now imagine a workplace where employee well-being is at the heart of everything. What would it look like? How would it work? What if we could see the truth behind the culture—the real investment in well-being—and instead of needing to recover from work, your work helped you recharge?

We believe growth starts with healthy people.

Picture a platform that blends Tinder, Twitch, and peer-reviewed science. Companies reveal themselves in subtle ways—we just need to connect the dots: news article, social media, reviews, discussions.

In today’s fast-paced work environment, mental health is more critical than ever. A sustainable, fulfilling career is deeply connected to aligning your values, work-life balance, and the company’s culture. We’re inviting you to develop a platform that not only matches employees with companies based on skills but also prioritizes shared values and mental health practices. This is your chance to revolutionize how we create work environments that genuinely support mental well-being and growth.

Imagine if finding the perfect workplace—a place where you thrive—was as simple as matching your values and needs with an employer's. Your platform could make this vision a reality. For Aava, this challenge offers an opportunity to help companies align their talent management practices, ensuring the right people evolve in the right roles, in a work culture that supports well-being.


## Project Overview: Our proposed solution

**Well Linked** is a platform dedicated to bridging the gap between job seekers and companies by aligning candidates' preferences for work culture, benefits, and values with what companies genuinely offer. Through data collection from employees, company information, and external sources (such as Glassdoor), Well Linked uses AI supported by [TEN Framework](https://github.com/TEN-framework/ten_framework) to match candidates with workplaces that fit their goals while providing companies with actionable insights to improve their workplace environment and employee satisfaction.

### Core Features
- **Employee Feedback and External Data Integration**: Collects employee feedback through the AI agent's (Nico) conversations and supplements it with external information to create a complete view of company culture.
- **Personalized Job Matching**: By collecting information from job seekers through the AI agent Nova, it matches job seekers with roles based on cultural alignment, benefits preferences, and skills, fostering better long-term fits.
- **Company Insights and Transparency**: Provides anonymized insights into employee sentiment, highlighting alignment gaps between the company’s stated values and real employee experiences.

## Demo
[![Watch a short demo](https://img.youtube.com/vi/hAZHlIzyVuk/0.jpg)](https://youtu.be/hAZHlIzyVuk)

[Check out our project on Junction's website](https://eu.junctionplatform.com/projects/junction-2024/view/672e82996afb9482214df2be)

## TEN Agent

[TEN Agent](https://agent.theten.ai) is the core technology driving Well Linked’s interactive AI-powered conversations. It demonstrates multimodal capabilities in speech, text, and reasoning using the TEN Framework and OpenAI Realtime API.

## Installation and Setup Guide
This section will guide you through setting up Well Linked locally using the TEN Framework.

## Branch Information
The main working branch for this repository is `junction`. Please make sure to base all contributions and pull requests on the `junction` branch.

### Prerequisites

1. **API Keys and Credentials**
   - **Agora App ID**: [Get Agora App ID](https://docs.agora.io/en/video-calling/get-started/manage-agora-account?platform=web#create-an-agora-project)
   - **Agora App Certificate** (only needed if enabled in the Agora Console)
   - **OpenAI Realtime API Key**: [OpenAI API](https://openai.com/index/openai-api/)

2. **Software Requirements**
   - **Docker**: [Download Docker](https://www.docker.com/)
   - **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/)
   - **Node.js (LTS v18)**: [Download Node.js](https://nodejs.org/en)

3. **Minimum System Requirements**
   - **CPU**: 2 Core or higher
   - **RAM**: 4 GB or higher

4. **Apple Silicon (M1/M2) Setup**
   - For Apple Silicon users, uncheck "Use Rosetta for x86_64/amd64 emulation on Apple Silicon" in Docker’s settings to avoid slower build and connection times.

### Setup Steps

#### 1. Clone Repository and Configure Environment Variables
In the root of the project directory, use `cp` to create a `.env` file from `.env.example`, then populate it with your API keys.

```bash
cp ./.env.example ./.env
```

Add your Agora and OpenAI API keys to the `.env` file:

```bash
# Agora API
AGORA_APP_ID=<YOUR_AGORA_APP_ID>
AGORA_APP_CERTIFICATE=<YOUR_AGORA_APP_CERTIFICATE>

# OpenAI Realtime API
OPENAI_REALTIME_API_KEY=<YOUR_OPENAI_REALTIME_API_KEY>
```

#### 2. Start the Docker Containers
Navigate to the project directory and run the following commands to start the Docker containers:

```bash
docker compose up  # For foreground mode
docker compose up -d  # For detached mode
```

#### 3. Build the TEN Agent Inside the Docker Container
Open a separate terminal, enter the container, and build the TEN agent:

```bash
docker exec -it ten_agent_dev bash
make build
```

#### 4. Start the Backend Server
Once the build completes, start the server on port 8080:

```bash
make run-server
```

#### 5. Build and Start the Frontend
- **Employee Agent Frontend**:
  ```bash
  cd playground_employee
  npm install
  npm run dev
  ```
- **Candidate Agent Frontend**:
  ```bash
  cd playground_candidate
  npm install
  npm run dev
  ```

### Verification

- **Employee Agent**: Open [localhost:3030](http://localhost:3030) in your browser.
- **Candidate Agent**: Open [localhost:3031](http://localhost:3031) in your browser.

## Acknowledgment 

We would like to thank [Ben Weekes](https://github.com/BenWeekes) from Agora for his support and guidance throughout the development of this project.
