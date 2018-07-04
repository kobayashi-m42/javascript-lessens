(() => {
  const answerList = document.getElementsByClassName('answer');
  const answerLength = answerList.length;

  /**
   * 正解を取得する
   *
   * @returns {Promise<void>}
   */
  const fetchAnswer = async () => {
    try {
      const request = {
        method: 'post'
      };
      const response = await fetch('/quiz', request);

      // TODO ステータスが200以外だった場合の処理を追加

      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * クイズの結果を画面に表示する
   *
   * @param answer
   * @param selected
   */
  const displayJudgement = (answer, selected) => {
    for (let i = 0; i < answerLength; i += 1) {
      if (answerList[i].textContent === answer) {
        answerList[i].classList.add('correct');
      } else {
        answerList[i].classList.add('wrong');
      }
    }

    const selectedList = selected;
    const selectedAnswer = selected.textContent;

    if (answer === selectedAnswer) {
      selectedList.textContent = `${selectedAnswer} ... CORRECT!`;
    } else {
      selectedList.textContent = `${selectedAnswer} ... WRONG!`;
    }
  };

  /**
   * クイズの選択肢が押された時の挙動
   *
   * @param selected
   */
  const handleAnswerBtnClick = async selected => {
    if (
      selected.classList.contains('correct') ||
      selected.classList.contains('wrong')
    ) {
      return;
    }
    try {
      selected.classList.add('selected');

      const answer = await fetchAnswer();

      displayJudgement(answer.correctAnswer, selected);
    } catch (error) {
      // TODO エラー処理を追加
    }
  };

  for (let i = 0; i < answerLength; i += 1) {
    answerList[i].addEventListener('click', async e => {
      await handleAnswerBtnClick(e.target);
    });
  }
})();
