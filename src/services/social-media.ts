/**
 * Represents the information needed to share content on a social media platform.
 */
export interface ShareContent {
  /**
   * The URL of the image to be shared.
   */
  imageUrl: string;
  /**
   * The text to be included with the shared image (e.g., a caption).
   */
  text: string;
}

/**
 * Asynchronously shares content (image and text) on a specified social media platform.
 * This implementation triggers a GitHub Action to handle the actual social media posting.
 *
 * @param platform The name of the social media platform (e.g., 'Twitter', 'Facebook').
 * @param content The content to be shared, including the image URL and accompanying text.
 * @returns A promise that resolves to true if the sharing was successful, false otherwise.
 */
export async function shareOnSocialMedia(
  platform: string,
  content: ShareContent
): Promise<boolean> {
  try {
    const repoOwner = 'your-github-username'; // Replace with your GitHub username
    const repoName = 'your-repo-name'; // Replace with your repository name
    const workflowId = 'social-media-post.yml'; // Replace with your workflow file name

    // Construct the API endpoint for triggering a workflow dispatch event
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowId}/dispatches`;

    // Prepare the request body
    const requestBody = {
      ref: 'main', // Replace with your branch name
      inputs: {
        platform: platform,
        imageUrl: content.imageUrl,
        text: content.text,
      },
    };

    // Set up the request headers with your GitHub token
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Make sure to set GITHUB_TOKEN in your environment variables
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    };

    // Make the POST request to trigger the workflow
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    // Check if the request was successful
    if (response.status === 204) {
      console.log(`Successfully triggered GitHub Action for ${platform}`);
      return true;
    } else {
      console.error(`Failed to trigger GitHub Action for ${platform}. Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('Error triggering GitHub Action:', error);
    return false;
  }
}
