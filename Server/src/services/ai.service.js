// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
// // const puppeteer = require("puppeteer")

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })


// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {



// const prompt = `
// IMPORTANT OUTPUT RULES:

// - Return exactly 8 technical questions as objects.
// - Return exactly 5 behavioral questions as objects.
// - Every question object must contain question, intention, and answer.
// - skillGaps must contain objects with skill and severity.
// - preparationPlan must contain exactly 7 objects.
// - Every preparationPlan object must contain day, focus, and tasks.
// - Never return questions as simple strings.
// - Never return skill gaps as simple strings.
// - Follow the provided JSON schema strictly.
// You are an expert technical interviewer, senior recruiter, resume evaluator, and interview preparation coach.

// Your task is to analyze the candidate's resume, self-description, and target job description and generate a personalized, accurate, and practical interview preparation report.

// CANDIDATE INFORMATION:

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// ANALYSIS REQUIREMENTS:

// 1. MATCH SCORE:
// - Generate matchScore as a number between 0 and 100.
// - Evaluate the candidate's skills, education, projects, and experience against the job requirements.
// - Give a realistic score based on evidence in the supplied information.
// - Do not inflate the score or assume unmentioned experience.

// 2. TECHNICAL QUESTIONS:
// - Generate exactly 8 technical interview questions.
// - Tailor questions to the actual job description and candidate's resume.
// - Cover relevant programming languages, frameworks, databases, APIs, project implementation, debugging, and technical concepts.
// - Each question must contain exactly these fields:
//   - question: A clear, realistic interview question.
//   - intention: Explain what the interviewer wants to assess.
//   - answer: Provide a useful sample answer with key points, practical examples, and relevant technical details.
// - Keep answers clear, accurate, and appropriate for the candidate's experience level.
// - Include questions about the candidate's actual projects when relevant.

// 3. BEHAVIORAL QUESTIONS:
// - Generate exactly 5 behavioral interview questions.
// - Cover teamwork, communication, problem-solving, learning ability, handling challenges, and project experience where relevant.
// - Each question must contain exactly these fields:
//   - question: The behavioral interview question.
//   - intention: Explain what the interviewer wants to evaluate.
//   - answer: Provide a realistic sample answer or a practical answering strategy.
// - Do not invent personal experiences or achievements. If specific details are unavailable, provide an adaptable sample answer.

// 4. SKILL GAPS:
// - Identify relevant skills required by the job that are missing, weak, or not sufficiently demonstrated in the supplied information.
// - Each skill gap must contain exactly:
//   - skill: The name of the skill requiring improvement.
//   - severity: One of "low", "medium", or "high".
// - Use "high" for important job requirements that could significantly affect interview performance, "medium" for useful skills needing improvement, and "low" for less critical gaps.
// - Do not assume that a skill is absent merely because it is not mentioned in the resume.
// - Generate only meaningful skill gaps; do not invent weaknesses.

// 5. PREPARATION PLAN:
// - Generate exactly 7 preparation-plan entries, covering Day 1 through Day 7.
// - Each entry must contain exactly:
//   - day: A number from 1 to 7, in sequential order.
//   - focus: The main topic or goal for that day.
//   - tasks: An array of specific, actionable tasks.
// - Create a progressive plan based on the candidate's skill gaps and the target role.
// - Include technical revision, practical coding, project explanation, interview practice, behavioral preparation, and a final mock interview.
// - Make tasks realistic and achievable within one day.

// 6. JOB TITLE:
// - Set title to the job title specified in the job description.
// - If no explicit title is available, infer a suitable title from the role requirements.
// - Return title as a string.

// STRICT JSON OUTPUT RULES:

// Return only one valid JSON object that matches the provided JSON schema.

// The object must contain exactly these six top-level fields:
// - matchScore
// - technicalQuestions
// - behavioralQuestions
// - skillGaps
// - preparationPlan
// - title

// The expected structure is:

// {
//   "matchScore": 75,
//   "technicalQuestions": [
//     {
//       "question": "Example technical question",
//       "intention": "What the interviewer wants to evaluate",
//       "answer": "A clear and technically accurate sample answer"
//     }
//   ],
//   "behavioralQuestions": [
//     {
//       "question": "Example behavioral question",
//       "intention": "What the interviewer wants to evaluate",
//       "answer": "A realistic sample answer or answering strategy"
//     }
//   ],
//   "skillGaps": [
//     {
//       "skill": "Example skill",
//       "severity": "medium"
//     }
//   ],
//   "preparationPlan": [
//     {
//       "day": 1,
//       "focus": "Example preparation focus",
//       "tasks": [
//         "Complete a specific practice task",
//         "Revise a relevant technical concept"
//       ]
//     }
//   ],
//   "title": "Target Job Title"
// }

// FINAL CHECKS BEFORE RESPONDING:
// - Include exactly 8 technical questions and 5 behavioral questions.
// - Include exactly 7 preparation-plan entries with day numbers 1 through 7.
// - Every question object must have question, intention, and answer as strings.
// - Every skill-gap object must have skill and severity as strings.
// - Severity must be exactly "low", "medium", or "high".
// - Every preparation-plan entry must have a numeric day, a string focus, and an array of string tasks.
// - matchScore must be a number between 0 and 100.
// - title must be a string.
// - Do not add extra fields or change the required field names.
// - Do not wrap the JSON in Markdown code fences.
// - Do not include explanations or text outside the JSON.
// - Do not return null for required fields.
// - Ensure the response is valid JSON and can be parsed using JSON.parse().
// `;

//     // const response = await ai.models.generateContent({
//     //     model: "gemini-3-flash-preview",
//     //     contents: prompt,
//     //     config: {
//     //         responseMimeType: "application/json",
//     //         responseSchema: zodToJsonSchema(interviewReportSchema),
//     //     }
//     // })

//     // return JSON.parse(response.text)
//     // // console.log(JSON.parse(response.text))

//      const response = await ai.models.generateContent({
//         model:  "gemini-3.5-flash",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema)
//         }
//     });

//     try {
//         // Check Gemini response
//         if (!response.text) {
//             throw new Error("Gemini returned an empty response");
//         }

//         // Parse JSON
//         const parsedResponse = JSON.parse(response.text);

//         // Debug AI response
//         console.log(
//             "Gemini AI Response:",
//             JSON.stringify(parsedResponse, null, 2)
//         );

//         // Validate response against Zod schema
//         const validatedReport = interviewReportSchema.parse(parsedResponse);

//         // Validate question counts
//         if (validatedReport.technicalQuestions.length !== 8) {
//             throw new Error("Expected exactly 8 technical questions");
//         }

//         if (validatedReport.behavioralQuestions.length !== 5) {
//             throw new Error("Expected exactly 5 behavioral questions");
//         }

//         if (validatedReport.preparationPlan.length !== 7) {
//             throw new Error("Expected exactly 7 preparation days");
//         }

//         return validatedReport;

//     } catch (error) {
//         console.error("Gemini Response Validation Error:", error);
//         throw new Error(`Invalid AI report: ${error.message}`);
//     }
// }






// module.exports =  generateInterviewReport ;


const { GoogleGenAI, Type } = require("@google/genai");
const puppeteer = require("puppeteer");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

// const { puppeteer } = require("puppeteer")

// ==========================================
// 1. ZOD VALIDATION SCHEMA
// ==========================================

const questionSchema = z.object({
    question: z.string().min(1),
    intention: z.string().min(1),
    answer: z.string().min(1)
}).strict();

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(questionSchema).length(8),

    behavioralQuestions: z.array(questionSchema).length(5),

    skillGaps: z.array(
        z.object({
            skill: z.string().min(1),
            severity: z.enum(["low", "medium", "high"])
        }).strict()
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().int().min(1).max(7),
            focus: z.string().min(1),
            tasks: z.array(z.string().min(1)).min(1)
        }).strict()
    ).length(7).refine(
        (plan) => plan.every((item, index) => item.day === index + 1),
        "Preparation days must be sequential from 1 to 7"
    ),

    title: z.string().min(1)
}).strict();

// ==========================================
// 2. GEMINI STRUCTURED RESPONSE SCHEMA
// ==========================================

const questionResponseSchema = {
    type: Type.OBJECT,
    properties: {
        question: {
            type: Type.STRING
        },
        intention: {
            type: Type.STRING
        },
        answer: {
            type: Type.STRING
        }
    },
    required: ["question", "intention", "answer"]
};

const GEMINI_RESPONSE_SCHEMA = {
    type: Type.OBJECT,

    properties: {
        matchScore: {
            type: Type.NUMBER
        },

        technicalQuestions: {
            type: Type.ARRAY,
            items: questionResponseSchema
        },

        behavioralQuestions: {
            type: Type.ARRAY,
            items: questionResponseSchema
        },

        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING
                    },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },

        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.INTEGER
                    },
                    focus: {
                        type: Type.STRING
                    },
                    tasks: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        },

        title: {
            type: Type.STRING
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};

// ==========================================
// 3. GENERATE INTERVIEW PROMPT
// ==========================================

// // Delay helper
// const delay = (ms) =>
//     new Promise((resolve) => setTimeout(resolve, ms));

// // Retry Gemini when it is temporarily unavailable
// const generateWithRetry = async (generateFunction, maxRetries = 3) => {
//     for (let attempt = 0; attempt <= maxRetries; attempt++) {
//         try {
//             return await generateFunction();

//         } catch (error) {
//             const status = error.status || error.code;

//             const retryable =
//                 status === 503 ||
//                 status === 429 ||
//                 status === "UNAVAILABLE" ||
//                 status === "RESOURCE_EXHAUSTED";

//             if (!retryable || attempt === maxRetries) {
//                 throw error;
//             }

//             const waitTime = 1000 * Math.pow(2, attempt);

//             console.log(
//                 `Gemini temporarily unavailable. Retrying in ${waitTime / 1000}s...`
//             );

//             await delay(waitTime);
//         }
//     }
// };

function createPrompt({ resume, selfDescription, jobDescription }) {

    return `
You are an expert technical interviewer, senior recruiter,
resume evaluator and interview preparation coach.

Analyze the candidate's resume, self-description and job description.

Generate a personalized interview preparation report.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription || "Not provided"}

TARGET JOB DESCRIPTION:
${jobDescription}

========================================
REPORT GENERATION REQUIREMENTS
========================================

1. MATCH SCORE

- Generate a realistic score between 0 and 100.
- Evaluate skills, projects, education and experience.
- Compare the resume with the job description.
- Never invent experience or skills.

2. TECHNICAL QUESTIONS

Generate EXACTLY 8 technical questions.

Every question must be an object containing:

- question: Realistic technical interview question.
- intention: What the interviewer wants to evaluate.
- answer: Detailed and technically accurate sample answer.

Questions should cover relevant technologies, programming,
frameworks, APIs, databases, debugging and projects.

3. BEHAVIORAL QUESTIONS

Generate EXACTLY 5 behavioral questions.

Every question must contain:

- question
- intention
- answer

Cover teamwork, communication, problem-solving,
learning ability and project experience.

Do not invent personal achievements.
Provide adaptable sample answers where necessary.

4. SKILL GAPS

Identify missing or weak skills based on the job requirements.

Every skill gap must be an object:

{
    "skill": "Redux",
    "severity": "medium"
}

Severity must be one of:

- low
- medium
- high

Do not invent weaknesses.

5. PREPARATION PLAN

Generate EXACTLY 7 preparation entries.

Each entry must contain:

{
    "day": 1,
    "focus": "React fundamentals",
    "tasks": [
        "Revise React hooks",
        "Practice React coding questions"
    ]
}

Days must be sequential from 1 to 7.

Include:
- Technical revision
- Coding practice
- Project explanation
- Skill gap improvement
- Behavioral preparation
- Interview practice
- Final mock interview

6. JOB TITLE

Generate the actual target job title from the job description.

If no explicit title exists, infer a suitable title.

========================================
STRICT OUTPUT REQUIREMENTS
========================================

- Return exactly one JSON object.
- Return exactly 8 technical question OBJECTS.
- Return exactly 5 behavioral question OBJECTS.
- Return skillGaps as an array of OBJECTS.
- Return exactly 7 preparation plan OBJECTS.
- Never return questions as simple strings.
- Never return skill gaps as simple strings.
- Never omit required properties.
- Never return undefined or null for required fields.
- Do not return Markdown.
- Do not include explanations outside JSON.
- Do not add extra top-level properties.

The response must match the provided structured response schema.

Generate meaningful, personalized and detailed answers.

Return the complete JSON response now.
`;
}

// ==========================================
// 4. PARSE GEMINI RESPONSE
// ==========================================

function parseAIResponse(response) {

    const responseText = response.text;

    if (!responseText || typeof responseText !== "string") {
        throw new Error("Gemini returned an empty or invalid response.");
    }

    // Remove accidental Markdown code fences
    const cleanedText = responseText
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "")
        .trim();

    let parsedResponse;

    try {
        parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
        throw new Error(
            `Gemini returned invalid JSON: ${error.message}`
        );
    }

    // Validate the complete response
    const validation = interviewReportSchema.safeParse(parsedResponse);

    if (!validation.success) {

        console.error(
            "AI Report Validation Errors:",
            JSON.stringify(validation.error.issues, null, 2)
        );

        throw new Error(
            `AI response does not match the required schema: ${validation.error.issues
                .map(issue =>
                    `${issue.path.join(".")}: ${issue.message}`
                )
                .join("; ")
            }`
        );
    }

    return validation.data;
}

// ==========================================
// 5. MAIN GENERATE INTERVIEW REPORT FUNCTION
// ==========================================

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    // Check API key
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;

    if (!apiKey) {
        throw new Error("GOOGLE_GENAI_API_KEY is not configured.");
    }

    // Validate input
    if (!resume || typeof resume !== "string" || !resume.trim()) {
        throw new Error("Valid resume content is required.");
    }

    if (
        !jobDescription ||
        typeof jobDescription !== "string" ||
        !jobDescription.trim()
    ) {
        throw new Error("Valid job description is required.");
    }

    // Initialize Gemini
    const ai = new GoogleGenAI({
        apiKey
    });

    let prompt = createPrompt({
        resume,
        selfDescription,
        jobDescription
    });

    let lastError;

    // Attempt generation twice if the response is invalid
    for (let attempt = 1; attempt <= 2; attempt++) {

        try {

            console.log(
                `Generating interview report. Attempt ${attempt}/2`
            );

            const response = await ai.models.generateContent({

                // Keep your configured Gemini model
                model: "gemini-3.8-flash",

                contents: prompt,

                config: {
                    responseMimeType: "application/json",

                    responseSchema: GEMINI_RESPONSE_SCHEMA,

                    temperature: 0.2
                }
            });

            // Parse and validate AI response
            const validatedReport = parseAIResponse(response);

            console.log("Interview report generated successfully.");

            console.log("Report Summary:", {
                title: validatedReport.title,
                matchScore: validatedReport.matchScore,
                technicalQuestions: validatedReport.technicalQuestions.length,
                behavioralQuestions: validatedReport.behavioralQuestions.length,
                skillGaps: validatedReport.skillGaps.length,
                preparationDays: validatedReport.preparationPlan.length
            });

            return validatedReport;

        } catch (error) {

            lastError = error;

            console.error(
                `Interview report generation failed (attempt ${attempt}):`,
                error.message
            );

            // Retry only for malformed or invalid AI output
            if (
                attempt === 1 &&
                (
                    error.message.includes("schema") ||
                    error.message.includes("JSON") ||
                    error.message.includes("empty or invalid response")
                )
            ) {

                prompt += `

IMPORTANT CORRECTION:

Your previous response did not satisfy the required output structure.

Generate the entire report again.

Pay special attention to:
- Exactly 8 technical question objects.
- Exactly 5 behavioral question objects.
- Skill gaps as objects.
- Exactly 7 preparation plan objects.
- A valid title string.
- All required fields must be present.

Follow the structured response schema strictly.
`;

                continue;
            }

            throw error;
        }
    }

    throw new Error(
        `Failed to generate a valid interview report: ${lastError?.message}`
    );
}


async function generatePdfromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return pdfBuffer;
}

// generate pdf


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;

    if (!apiKey) {
        throw new Error("GOOGLE_GENAI_API_KEY is not configured in .env");
    }

    const ai = new GoogleGenAI({
        apiKey: apiKey
    });

    try {
        const resumePdfSchema = z.object({
            html: z.string().describe(
                "Complete HTML content of the generated resume"
            )
        });

        const prompt = `
            Generate a professional, ATS-friendly resume using the following details.

            RESUME:
            ${resume}

            SELF DESCRIPTION:
            ${selfDescription}

            JOB DESCRIPTION:
            ${jobDescription}

            Requirements:
            1. Create a professional, clean and modern resume.
            2. Make it ATS-friendly.
            3. Highlight skills relevant to the job description.
            4. Maintain accurate information. Never invent experience,
               qualifications or skills.
            5. Use proper HTML and CSS.
            6. Return valid JSON with one field named "html".
            7. HTML must be complete and ready for PDF generation.
            8. Use print-friendly A4 formatting.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema)
            }
        });

        const responseText = response.text;

        if (!responseText) {
            throw new Error("Gemini returned an empty response");
        }

        const jsonContent = JSON.parse(responseText);

        const validatedData = resumePdfSchema.parse(jsonContent);

        // Generate PDF from Gemini HTML
        const pdfBuffer = await generatePdfromHtml(validatedData.html);

        // Return PDF buffer
        return pdfBuffer;

    } catch (error) {
        console.error("Generate Resume PDF Error:", error);
        throw error;
    }
}


// PDF Generator Function
async function generatePdfromHtml(htmlContent) {

    let browser;

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "15mm",
                bottom: "15mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return Buffer.from(pdfBuffer);

    } catch (error) {
        console.error("PDF Generation Error:", error);
        throw error;

    } finally {
        if (browser) {
            await browser.close();
        }
    }
}


// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     // const ai = new GoogleGenAI({
//     //      apiKey = process.env.GOOGLE_GENAI_API_KEY;
//     // });

//     const apiKey = process.env.GOOGLE_GENAI_API_KEY;

//     if (!apiKey) {
//         throw new Error("GOOGLE_GENAI_API_KEY is not configured in .env");
//     }

//     // Initialize Gemini
//     const ai = new GoogleGenAI({
//         apiKey: apiKey
//     });


//     try {
//         const resumePdfSchema = z.object({
//             html: z.string().describe(
//                 "Complete HTML content of the generated resume"
//             )
//         });

//         const prompt = `
//             Generate a professional, ATS-friendly resume using the following details.

//             RESUME:
//             ${resume}

//             SELF DESCRIPTION:
//             ${selfDescription}

//             JOB DESCRIPTION:
//             ${jobDescription}

//             Requirements:
//             1. Create a professional, clean and modern resume.
//             2. Make it ATS-friendly.
//             3. Highlight skills relevant to the job description.
//             4. Maintain accurate information. Never invent experience,
//                qualifications or skills.
//             5. Use proper HTML and CSS.
//             6. Return valid JSON with one field named "html".
//             7. HTML must be complete and ready for PDF generation.
//             8. Use print-friendly A4 formatting.
//         `;

//         const response = await ai.models.generateContent({
//             model: "gemini-3.5-flash-lite",
//             contents: prompt,
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: zodToJsonSchema(resumePdfSchema)
//             }
//         });

//         const responseText = response.text;

//         if (!responseText) {
//             throw new Error("Gemini returned an empty response");
//         }

//         const jsonContent = JSON.parse(responseText);

//         // Validate Gemini response
//         const validatedData = resumePdfSchema.parse(jsonContent);

//         // Generate PDF from HTML
//         // const pdfBuffer = await generatePdfromHtml(validatedData.html);
//         async function generatePdfromHtml(htmlContent) {
//             let browser;

//             try {
//                 browser = await puppeteer.launch({
//                     headless: true,
//                     args: ["--no-sandbox", "--disable-setuid-sandbox"]
//                 });

//                 const page = await browser.newPage();

//                 await page.setContent(htmlContent, {
//                     waitUntil: "networkidle0"
//                 });

//                 const pdfBuffer = await page.pdf({
//                     format: "A4",
//                     printBackground: true,
//                     preferCSSPageSize: true,
//                     margin: {
//                         top: "15mm",
//                         bottom: "15mm",
//                         left: "15mm",
//                         right: "15mm"
//                     }
//                 });

//                 return Buffer.from(pdfBuffer);

//             } catch (error) {
//                 console.error("PDF Generation Error:", error);
//                 throw new Error(`Failed to generate PDF: ${error.message}`);

//             } finally {
//                 if (browser) {
//                     await browser.close();
//                 }
//             }
//         }


//     } catch (error) {
//         console.error("Generate Resume PDF Error:", error);
//         throw error;
//     }
// }


// // async function generateResumePdf({ resume , selfDescription, jobDescription }) {

// //     const resumePdfSchema = z.object({
// //         html: z.string().describe("the html content of the resume which is used to generate the pdf using any library like puppeteer"),
// //     })

// //     const prompt = `generate a resume using this following details :

// //     Resume:${resume}
// //     Self Description:${selfDescription}
// //     Job Description:${jobDescription}

// //     the resume should be in json object with a  singlle field called html which contains the html content of the resume which is used to generate the pdf using any library like puppeteer

// //     `

// //     const response = await ai.models.generateContent({
// //         model: "gemini-3.5-flash-preview",
// //         contents: prompt,
// //         config:{
// //             responseMimeType: "application/json",
// //             responseSchema: zodToJsonSchema(resumePdfSchema)
// //         }
// //     })

// //     const jsonContent = JSON.parse(response.text)

// //     const pdfBuffer = await generatePdfromHtml(jsonContent.html)
// //     return pdfBuffer

// // }


// // ==========================================
// // 6. EXPORT SERVICE
// // ==========================================

module.exports = { generateInterviewReport, generateResumePdf };
