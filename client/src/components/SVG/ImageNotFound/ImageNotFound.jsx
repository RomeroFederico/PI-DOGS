import React from 'react';

export default function ImageNotFound({ style }) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}}
         className = {style}
    >
      <path d="M115.652 306.304c4.181 2.074 9.284.401 11.401-3.789 2.125-4.181.444-9.31-3.729-11.46-1.237-.64-30.455-16.171-38.11-62.063-.623-3.772-3.686-6.664-7.501-7.074-3.9-.435-7.415 1.766-8.841 5.308-18.517 46.31 16.401 99.533 17.894 101.777 1.638 2.466 4.352 3.797 7.1 3.797 1.621 0 3.268-.469 4.727-1.434 3.917-2.611 4.983-7.902 2.381-11.827-.213-.324-14.66-22.417-19.115-48.435 14.039 25.028 32.692 34.645 33.793 35.2zM155.273 324.096c4.617-.922 7.62-5.419 6.699-10.035-.93-4.617-5.376-7.62-10.044-6.69-17.126 3.422-49.528 22.067-49.528 68.096 0 33.399 6.997 56.568 12.399 69.453-18.68 3.627-29.466 15.377-29.466 32.947C85.333 497.647 103.279 512 128 512h8.533c14.148 0 22.852-10.607 23.791-11.81 2.901-3.712 2.244-9.079-1.476-11.981-3.712-2.91-9.079-2.236-11.972 1.468-.043.06-4.378 5.257-10.342 5.257H128c-12.723 0-25.6-5.862-25.6-17.067 0-4.224 0-17.067 25.6-17.067 3.132 0 5.999-1.732 7.492-4.489 1.493-2.756 1.34-6.118-.367-8.738-.162-.247-15.659-24.559-15.659-72.107.001-43.272 34.39-51.063 35.807-51.37zM397.201 444.919c5.402-12.885 12.399-36.053 12.399-69.453 0-46.029-32.401-64.674-49.527-68.096-4.625-.913-9.114 2.065-10.044 6.69-.922 4.617 2.082 9.114 6.699 10.035 1.468.299 35.806 7.672 35.806 51.371 0 47.548-15.497 71.859-15.633 72.064-1.741 2.62-1.911 5.99-.427 8.764 1.485 2.773 4.378 4.506 7.526 4.506 25.6 0 25.6 12.843 25.6 17.067 0 11.204-12.877 17.067-25.6 17.067h-8.533c-5.888 0-10.223-5.111-10.394-5.316-2.91-3.644-8.226-4.292-11.921-1.408-3.721 2.901-4.378 8.269-1.476 11.981.939 1.203 9.643 11.81 23.791 11.81H384c24.73 0 42.667-14.353 42.667-34.133 0-17.571-10.786-29.322-29.466-32.949zM308.634 444.382l15.514-93.107c.776-4.651-2.364-9.045-7.014-9.822-4.668-.768-9.045 2.364-9.813 7.006l-15.881 95.275h-1.306c-4.719 0-8.533 3.823-8.533 8.533 0 4.71 3.814 8.533 8.533 8.533h8.533c25.6 0 25.6 12.843 25.6 17.067 0 11.204-12.877 17.067-25.6 17.067h-8.533c-14.114 0-25.6-11.486-25.6-25.6V349.867c0-4.71-3.814-8.533-8.533-8.533-4.719 0-8.533 3.823-8.533 8.533v119.467c0 14.114-11.486 25.6-25.6 25.6h-8.533c-12.723 0-25.6-5.862-25.6-17.067 0-4.224 0-17.067 25.6-17.067h8.533c4.719 0 8.533-3.823 8.533-8.533 0-4.71-3.814-8.533-8.533-8.533h-1.306l-15.88-95.275c-.759-4.642-5.154-7.774-9.813-7.006-4.651.777-7.791 5.171-7.014 9.822l15.514 93.107c-20.668 2.859-32.7 14.925-32.7 33.485 0 19.78 17.946 34.133 42.667 34.133h8.533c13.943 0 26.342-6.724 34.133-17.092C263.791 505.276 276.19 512 290.133 512h8.533c24.73 0 42.667-14.353 42.667-34.133 0-18.56-12.032-30.626-32.699-33.485z"/>
      <path d="M468.429 72.986C449.673 35.465 404.489 0 375.467 0c-16.478 0-44.834 25.549-59.076 39.475C299.93 25.37 279.893 17.067 256 17.067s-43.93 8.303-60.39 22.409C181.367 25.549 153.011 0 136.533 0c-29.022 0-74.206 35.465-92.962 72.986-5.649 11.281-9.438 26.53-9.438 37.948 0 23.526 19.14 42.667 42.667 42.667 21.205 0 30.694-13.943 38.306-25.148.93-1.357 1.852-2.722 2.927-4.25l34.133-51.2c2.62-3.925 1.562-9.225-2.364-11.836-3.942-2.628-9.225-1.562-11.836 2.364l-34.005 51.012c-1.007 1.425-1.988 2.867-2.97 4.309-7.672 11.298-12.587 17.681-24.192 17.681-14.114 0-25.6-11.486-25.6-25.6 0-8.866 3.14-21.333 7.637-30.319 16.811-33.63 57.455-63.548 77.696-63.548 7.279 0 28.945 16.947 47.01 34.509-32.06 37.274-47.01 99.678-47.01 161.758 0 78.788 34.611 110.933 119.467 110.933s119.467-32.145 119.467-110.933c0-62.089-14.95-124.484-47.01-161.758 18.065-17.562 39.723-34.509 47.01-34.509 20.241 0 60.885 29.918 77.705 63.548 4.489 8.986 7.629 21.453 7.629 30.319 0 14.114-11.486 25.6-25.6 25.6-12.023 0-16.768-6.315-24.772-18.406l-36.395-54.596c-2.611-3.925-7.91-4.992-11.836-2.364-3.925 2.611-4.983 7.91-2.364 11.836l36.361 54.545c8.09 12.211 17.246 26.052 39.006 26.052 23.526 0 42.667-19.14 42.667-42.667 0-11.417-3.789-26.666-9.438-37.947zM358.4 213.333c0 69.308-26.803 93.867-102.4 93.867s-102.4-24.559-102.4-93.867c0-89.199 31.667-179.2 102.4-179.2s102.4 90.001 102.4 179.2z"/>
      <path d="M299.614 252.092c-1.459 2.842-7.159 3.874-9.481 3.908-9.992 0-20.318-8.508-24.047-18.287 14.029-3.174 24.047-12.689 24.047-24.38 0-14.353-14.993-25.6-34.133-25.6s-34.133 11.247-34.133 25.6c0 11.691 10.018 21.205 24.047 24.38-3.721 9.779-14.046 18.287-23.988 18.287-2.449-.034-8.03-1.067-9.591-4.002-2.21-4.164-7.373-5.743-11.537-3.533s-5.751 7.373-3.533 11.537c6.741 12.698 22.793 13.065 24.602 13.065 13.252 0 26.069-7.569 34.133-18.398 8.064 10.829 20.881 18.398 34.133 18.398 1.826 0 18.057-.375 24.653-13.158 2.159-4.19.512-9.335-3.678-11.494s-9.327-.522-11.494 3.677zM256 221.867c-10.257 0-17.067-5.137-17.067-8.533s6.81-8.533 17.067-8.533c10.419 0 17.067 5.052 17.067 8.533s-6.648 8.533-17.067 8.533zM294.4 153.6c7.057 0 12.8-5.743 12.8-12.8s-5.743-12.8-12.8-12.8-12.8 5.743-12.8 12.8 5.743 12.8 12.8 12.8zM217.6 153.6c7.057 0 12.8-5.743 12.8-12.8s-5.743-12.8-12.8-12.8-12.8 5.743-12.8 12.8 5.743 12.8 12.8 12.8z"/>
    </svg>
  );
}